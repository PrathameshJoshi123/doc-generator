import os
import time
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


def build_file_prompt(file_path: str, file_content: str, lang: str) -> str:
    """
    Builds a prompt to send the full source file to the LLM for documentation and summarization.
    """
    comment_style = get_comment_syntax(lang)

    return f"""You are a professional {lang} developer and technical writer.

Your job is to insert helpful documentation comments into the following {lang} code.

Instructions:
1. For each function or class, add a concise documentation comment above it using correct {lang} syntax.
2. Do not modify or remove any original code.
3. Return the FULL original code with the inserted comments included.
4. Preserve the original formatting and indentation exactly.
5. Do NOT use any Markdown or backticks — return plain source code.
6. At the END of the code, append a section like this:

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


def safe_llm_call(prompt: str, retries: int = 3, delay: int = 60) -> str:
    """
    Calls the LLM with retry logic for rate limiting and transient errors.
    """
    for attempt in range(1, retries + 1):
        try:
            return get_llm_response(prompt).strip()
        except Exception as e:
            if "429" in str(e):
                print(f"[Rate Limit] Waiting {delay}s before retry... (Attempt {attempt}/{retries})")
                time.sleep(delay)
            else:
                print(f"LLM call failed: {e}")
                raise
    raise Exception("Max retries reached for LLM call")


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
        file_code = file_data.get("code", "")
        language = file_data.get("type", "text")
        symbols = file_data.get("contains", [])

        if not file_code.strip():
            continue

        prompt = build_file_prompt(file_path, file_code, language)

        try:
            result = safe_llm_call(prompt)

            # Split code and summary
            code_only, summary_lines = split_code_and_summary(result)

            modified_files[file_path] = code_only
            if summary_lines:
                summaries[file_path] = "\n".join([f"- {s}" for s in summary_lines])
                readme_summaries[file_path] = {
                    "file": file_path,
                    "summary": " ".join(summary_lines),
                    "type": language,
                    "contains": symbols
                }

        except Exception as e:
            print(f"[Error] Failed to process {file_path}: {e}")

    state.modified_files = modified_files
    state.summaries = summaries
    state.readme_summaries = list(readme_summaries.values())

    return state
