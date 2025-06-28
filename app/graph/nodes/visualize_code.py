from app.models.state import DocGenState
from app.utils.mistral import get_llm_response_commenting
import re

def visualize_code_node(state: DocGenState) -> DocGenState:
    if not state.working_dir:
        return state

    repo_data = state.parsed_data.get("repo_path", {})
    file_paths = sorted(repo_data.keys())

    # Build all folder and file paths
    all_paths = set()
    for file_path in file_paths:
        parts = file_path.split("/")
        for i in range(1, len(parts)):
            folder = "/".join(parts[:i]) + "/"
            all_paths.add(folder)
        all_paths.add(file_path)

    folder_structure = "\n".join(sorted(all_paths))
    print("folder_structure:\n", folder_structure)

    prompt = f"""
You are a precise and highly disciplined technical assistant.

Your task: Generate a Mermaid.js diagram using the `graph TD` syntax that exactly matches the folder structure given below.

Folder structure:
{folder_structure}

⚠️ Strict instructions:
- Do NOT add any reasoning steps, thought process, or "thinking" blocks.
- Do NOT invent or assume any extra folders or files.
- Only include items explicitly present in the list.
- Do NOT add any comments, explanation, or text before or after the diagram.
- Output ONLY valid Mermaid code, starting with `graph TD`.
- Use "Project_Root" as the root node label.

Example format:
graph TD
    A[Project_Root] --> B[src/]
    B --> C[main.py]
    A --> D[README.md]

Now generate the Mermaid diagram strictly based on the provided paths.
"""

    # Get the response
    response = get_llm_response_commenting(prompt=prompt)
    raw_content = response.content if hasattr(response, "content") else response

    # Remove <think> blocks
    cleaned_content = re.sub(r"<think>.*?</think>", "", raw_content, flags=re.DOTALL).strip()

    # Keep only the part starting from 'graph TD'
    mermaid_start = cleaned_content.find("graph TD")
    if mermaid_start != -1:
        mermaid_code = cleaned_content[mermaid_start:].strip()
    else:
        mermaid_code = cleaned_content  # fallback if already clean

    # Explicitly remove any stray backticks
    mermaid_code = mermaid_code.replace("`", "")

    # Store in state
    state.visuals = state.visuals or {}
    state.visuals["folder_structure_mermaid"] = mermaid_code

    return state
