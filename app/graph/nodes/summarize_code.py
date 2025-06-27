from app.models.state import DocGenState
from app.utils.mistral import get_llm_response
import os


def summarize_code_node(state: DocGenState) -> DocGenState:
    """
    Summarize each source file using LLM and store detailed summaries and README-ready summaries.
    """
    if not state.preferences.generate_summary or not state.parsed_data:
        return state

    summaries = {}
    readme_summaries = {}

    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_info in repo_data.items():
        print("Processing file:", file_path)

        file_code = file_info.get("code", "")
        language = file_info.get("type", "text")
        symbols = file_info.get("contains", [])

        if not file_code.strip():
            continue

        # Strict, concise summarization prompt
        prompt = (
            f"You are a senior software engineer reviewing the following {language} source file.\n"
            f"For every function or class defined in this file, write a strict, technical 1-3 lines summary "
            f"explaining its purpose and behavior. Do NOT include any general description of the file.\n\n"
            f"Return only one line per symbol (function/class) from this list: {', '.join(symbols) if symbols else '[none]'}.\n\n"
            f"### Code:\n```{language}\n{file_code.strip()}\n```"
        )

        response = get_llm_response(prompt).strip()
        cleaned_summary = response.replace("```", "").strip()

        summaries[file_path] = cleaned_summary

        # Extract first usable sentence for README
        first_line = cleaned_summary.split(".")[0].strip()
        readme_summary = {
            "file": file_path,
            "summary": f"{first_line}." if first_line else "No summary available.",
            "type": language,
            "contains": symbols
        }

        readme_summaries[file_path] = readme_summary

    state.summaries = summaries
    state.readme_summaries = list(readme_summaries.values())
    return state
