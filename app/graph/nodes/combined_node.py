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



def build_combined_prompt(file_path: str, entities: dict, entity_type: str) -> str:
    lang = os.path.splitext(file_path)[1].lstrip(".")
    comment_style = get_comment_syntax(lang)

    prompt = f"""You are a professional {lang} developer and technical writer.

For each {entity_type} listed below:
1. Add a concise, professional **documentation comment** above the code using the correct syntax for {lang}.
2. Then, on a new line, write a **brief summary** of the code functionality in the form of a comment (use {lang}-style comment).

⚠️ Rules:
- Do NOT wrap the output in markdown, triple backticks, or any format.
- ONLY return the modified code blocks with comments.
- Use correct indentation and line formatting as per the language.
- Do NOT include any explanations or additional commentary outside the code.

Example of summary format (in {lang}):
{comment_style['start']} This method does XYZ... {comment_style['end']}
"""

    for code, name in entities.items():
        prompt += f"\n// --- {entity_type.capitalize()}: {name} ---\n{code}\n"

    return prompt



def extract_summaries_from_response(response: str) -> list:
    """
    Extracts all `### Summary: ...` lines from the LLM response.
    """
    lines = response.splitlines()
    return [line.strip().replace("### Summary:", "").strip() for line in lines if line.strip().startswith("### Summary:")]


def docstring_and_summary_node(state: DocGenState) -> DocGenState:
    """
    Adds docstrings and extracts summaries in one LLM call per entity type per file.
    Stores docstring-modified code in state.modified_files
    Stores summaries in state.summaries
    Stores lightweight summaries in state.readme_summaries for README use
    """
    if not (state.preferences.add_inline_comments and state.preferences.generate_summary):
        return state

    modified_files = {}
    summaries = {}
    readme_summaries = {}

    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        updated_blocks = []
        file_summaries = []
        readme_lines = []

        for entity_type in ["functions", "classes"]:
            entities = file_data.get(entity_type, {})
            if not entities:
                continue

            prompt = build_combined_prompt(file_path, entities, entity_type[:-1])
            try:
                result = get_llm_response(prompt).strip()
                updated_blocks.append(result)

                summary_lines = extract_summaries_from_response(result)
                if summary_lines:
                    file_summaries.append(f"## {entity_type.capitalize()} Summary\n" + "\n".join([f"- {s}" for s in summary_lines]))
                    readme_lines.extend(summary_lines)

            except Exception as e:
                print(f"Error processing {entity_type} in {file_path}: {e}")

        if updated_blocks:
            modified_files[file_path] = "\n\n".join(updated_blocks)
        if file_summaries:
            summaries[file_path] = "\n\n".join(file_summaries)
        if readme_lines:
            readme_summaries[file_path] = " ".join(readme_lines)

    state.modified_files = modified_files
    state.summaries = summaries
    state.readme_summaries = readme_summaries
    return state
