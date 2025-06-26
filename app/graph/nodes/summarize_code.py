from app.models.state import DocGenState
from app.utils.mistral import get_llm_response

def summarize_code_node(state: DocGenState) -> DocGenState:
    """
    Summarize parsed functions and classes using Mistral and store them in state.summaries
    """

    if not state.preferences.generate_summary or not state.parsed_data:
        return state
    
    summaries = {}
    readme_summaries = {}

    # print("parsed", state.parsed_data.items())
    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        print("Processing file:", file_path)

        functions = file_data.get("functions", {})
        classes = file_data.get("classes", {})

        file_summaries = []
        readme_lines = []

        # --- Batch summarize functions ---
        if functions:
            func_prompt = "You are a technical expert. Summarize the following functions. Provide a 1–2 line technical summary for each:\n\n"
            for func_code, func_name in functions.items():
                func_prompt += f"### Function `{func_name}`:\n```java\n{func_code}\n```\n\n"

            func_summary_response = get_llm_response(func_prompt).strip()
            file_summaries.append("## Functions Summary\n" + func_summary_response)

            first_func_summary = next((line for line in func_summary_response.splitlines() if line.strip()), None)
            if first_func_summary:
                readme_lines.append(first_func_summary)

        # --- Batch summarize classes ---
        if classes:
            class_prompt = "You are a technical expert. Summarize the following classes. List their responsibilities and role in the system briefly:\n\n"
            for class_code, class_name in classes.items():
                class_prompt += f"### Class `{class_name}`:\n```java\n{class_code}\n```\n\n"

            class_summary_response = get_llm_response(class_prompt).strip()
            file_summaries.append("## Classes Summary\n" + class_summary_response)

            first_class_summary = next((line for line in class_summary_response.splitlines() if line.strip()), None)
            if first_class_summary:
                readme_lines.append(first_class_summary)

        summaries[file_path] = "\n\n".join(file_summaries)
        readme_summaries[file_path] = " ".join(readme_lines) or "No summary available."


    state.summaries = summaries
    state.readme_summaries = readme_summaries
    return state