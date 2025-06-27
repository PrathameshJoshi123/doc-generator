from app.models.state import DocGenState
from app.utils.mistral import get_llm_response
import os

def summarize_code_node(state: DocGenState) -> DocGenState:
    """
    Summarize parsed functions and classes using LLM and store them in state.summaries and state.readme_summaries.
    """
    if not state.preferences.generate_summary or not state.parsed_data:
        return state

    summaries = {}
    readme_summaries = {}

    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        print("Processing file:", file_path)

        functions = file_data.get("functions", {})
        classes = file_data.get("classes", {})

        file_summaries = []
        readme_lines = []

        lang = os.path.splitext(file_path)[1].lstrip(".") or "txt"

        # Summarize functions
        if functions:
            func_prompt = "You are a technical expert. For each function below, provide a one-line technical summary:\n\n"
            for func_code, func_name in functions.items():
                func_prompt += f"### Function `{func_name}`:\n{func_code.strip()}\n\n"

            func_summary = get_llm_response(func_prompt).strip()
            func_summary_clean = func_summary.replace("```", "").strip()
            file_summaries.append("## Functions Summary\n" + func_summary_clean)

            # Grab first usable line (not necessarily first line)
            for line in func_summary_clean.splitlines():
                line = line.strip("- ").strip()
                if line:
                    readme_lines.append(line)
                    break

        # Summarize classes
        if classes:
            class_prompt = "You are a technical expert. For each class below, provide a short technical summary of its purpose and behavior:\n\n"
            for class_code, class_name in classes.items():
                class_prompt += f"### Class `{class_name}`:\n{class_code.strip()}\n\n"

            class_summary = get_llm_response(class_prompt).strip()
            class_summary_clean = class_summary.replace("```", "").strip()
            file_summaries.append("## Classes Summary\n" + class_summary_clean)

            for line in class_summary_clean.splitlines():
                line = line.strip("- ").strip()
                if line:
                    readme_lines.append(line)
                    break

        summaries[file_path] = "\n\n".join(file_summaries).strip()
        readme_summaries[file_path] = " ".join(readme_lines) or "No summary available."

    state.summaries = summaries
    state.readme_summaries = readme_summaries
    return state
