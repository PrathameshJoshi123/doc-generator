import os
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response


def get_comment_syntax(lang: str) -> dict:
    """
    Returns appropriate documentation comment syntax based on the file extension.
    """
    lang = lang.lower()
    if lang in ["py", "python"]:
        return {"start": "\"\"\"", "end": "\"\"\""}
    elif lang in ["js", "ts", "java", "c", "cpp"]:
        return {"start": "/**", "end": "*/"}
    elif lang in ["go"]:
        return {"start": "//", "end": ""}
    elif lang in ["rb", "swift"]:
        return {"start": "///", "end": ""}
    elif lang in ["css"]:
        return {"start": "/*", "end": "*/"}
    elif lang in ["html", "htm"]:
        return {"start": "<!--", "end": "-->"}
    else:
        return {"start": "//", "end": ""}


def build_file_prompt(file_path: str, file_content: str) -> str:
    """
    Builds a prompt to send the full source file to the LLM for documentation and summarization.
    """
    lang = os.path.splitext(file_path)[1].lstrip(".")
    comment_style = get_comment_syntax(lang)

    return f"""You are a professional {lang} developer and technical writer.

Your job is to add helpful documentation comments to the following {lang} code file.

Instructions:
1. For each function or class, add a concise documentation comment above it using correct {lang} syntax.
2. Do not change any code. Only insert comments.
3. Keep indentation and formatting exactly the same.
4. Do NOT use any Markdown formatting. Do NOT use backticks (`) or code blocks.
5. At the END of the file, append a section like this:
####SUMMARY####
Class/Function summaries:
- <Summary 1>
- <Summary 2>
...

Use this comment format:
{comment_style['start']} This function does XYZ... {comment_style['end']}

Here is the code:
{file_content}
"""



def split_code_and_summary(response: str):
    """
    Splits the LLM response into code and summary based on the marker.
    """
    if "####SUMMARY####" in response:
        code_part, summary_part = response.split("####SUMMARY####", 1)
        summaries = [
            line.strip("- ").strip()
            for line in summary_part.strip().splitlines()
            if line.strip().startswith("-")
        ]
        return code_part.strip(), summaries
    else:
        return response.strip(), []


def docstring_and_summary_node(state: DocGenState) -> DocGenState:
    """
    Sends entire file for documentation, extracts summaries, and stores results.
    """
    if not (state.preferences.add_inline_comments and state.preferences.generate_summary):
        return state

    modified_files = {}
    summaries = {}
    readme_summaries = {}

    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        file_content = file_data.get("content")
        if not file_content:
            continue

        prompt = build_file_prompt(file_path, file_content)

        try:
            result = get_llm_response(prompt).strip()

            # Split code and summary
            code_only, summary_lines = split_code_and_summary(result)

            modified_files[file_path] = code_only
            if summary_lines:
                summaries[file_path] = "\n".join([f"- {s}" for s in summary_lines])
                readme_summaries[file_path] = " ".join(summary_lines)

        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # Store all results back into state
    state.modified_files = modified_files
    state.summaries = summaries
    state.readme_summaries = readme_summaries

    return state
