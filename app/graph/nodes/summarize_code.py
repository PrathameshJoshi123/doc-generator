from app.models.state import DocGenState
from app.utils.mistral import get_llm_response

def summarize_code_node(state: DocGenState) -> DocGenState:
    """
    Summarize parsed functions and classes using Mistral and store them in state.summaries
    """

    if not state.preferences.generate_summary or not state.parsed_data:
        return state
    
    summaries = {}

    # print("parsed", state.parsed_data.items())
    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        print("Processing file:", file_path)

        functions = file_data.get("functions", {})
        classes = file_data.get("classes", {})

        file_summaries = []

        for func_code, func_name in functions.items():
            print("Function:", func_name)
            prompt = f"Summarize this function:\n\n{func_code}\n\nProvide a 1 - 2 line technical summary."
            summary = get_llm_response(prompt=prompt)
            file_summaries.append(f"### Function `{func_name}`:\n{summary.strip()}")

        for class_code, class_name in classes.items():
            print("Class:", class_name)
            prompt = f"Summarize this class:\n\n{class_code}\n\nList its responsibilities briefly."
            summary = get_llm_response(prompt=prompt)
            file_summaries.append(f"### Class `{class_name}`:\n{summary.strip()}")

        summaries[file_path] = "\n\n".join(file_summaries)


    state.summaries = summaries
    return state