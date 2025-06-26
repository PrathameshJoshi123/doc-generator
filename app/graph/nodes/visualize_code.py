from app.models.state import DocGenState
from app.utils.mistral import get_llm_response

def visualize_code_node(state: DocGenState) -> DocGenState:
    if not state.working_dir:
        return state

    repo_data = state.parsed_data.get("repo_path", {})

    # Step 1: Build folder structure as a list of paths
    file_paths = sorted(repo_data.keys())  # e.g., ['src/main.py', 'src/utils/helpers.py', 'README.md']

    # Add folders from file paths
    all_paths = set()

    for file_path in file_paths:
        parts = file_path.split("/")
        for i in range(1, len(parts)):
            folder = "/".join(parts[:i]) + "/"
            all_paths.add(folder)
        all_paths.add(file_path)

# Combine and sort
    folder_structure = "\n".join(sorted(all_paths))

    print("folder_structure:\n", folder_structure)
        # Step 2: Ask the LLM to convert this into a Mermaid diagram

    prompt = f"""
    You are given a list of file paths that represent a folder structure:

    {folder_structure}

    Your task is to generate a Mermaid.js diagram using the `graph TD` syntax that exactly reflects this folder structure.

    ❗️Important:
    - Do not invent or assume any extra folders or files.
    - Only include what is explicitly present in the list.
    - Use clear and consistent folder/file names.
    - Do not add any explanation, title, or comments.
    - Output only valid Mermaid code, starting with `graph TD`.
    - Keep Project root as Project_Root

    Example format:
    graph TD
        A[Project Root] --> B[src/]
        B --> C[main.py]
        A --> D[README.md]

    Now output the Mermaid diagram based strictly on the provided paths:
    """

    # Step 3: Get the Mermaid diagram from the LLM
    response = get_llm_response(prompt=prompt)
    mermaid_code = response.content if hasattr(response, "content") else response

    # Step 4: Store in state.visuals
    state.visuals = state.visuals or {}
    state.visuals["folder_structure_mermaid"] = mermaid_code.strip()

    return state
