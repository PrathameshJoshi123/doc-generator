import os
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response


def build_batch_prompt(file_path: str, entities: dict, entity_type: str) -> str:
    lang = os.path.splitext(file_path)[1].lstrip(".")
    prompt = f"""You are a professional {lang} developer.

Add a concise, professional documentation comment above each {entity_type} listed below.

⚠️ Return ONLY the full modified {lang} code blocks with docstrings — no explanation, no markdown, no ```.

Do not change the logic. Just add documentation.

"""

    for code, name in entities.items():
        prompt += f"\n// --- {entity_type.capitalize()}: {name} ---\n{code}\n"

    return prompt


def add_docstrings(state: DocGenState) -> DocGenState:
    """
    Adds inline docstrings to parsed functions and classes using Mistral.
    Stores updated code in state.modified_files.
    """
    print("Inside DocStrings")

    if not state.preferences.add_inline_comments or not state.parsed_data:
        return state

    modified_files = {}
    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        print("Processing file:", file_path)
        updated_blocks = []

        functions = file_data.get("functions", {})
        classes = file_data.get("classes", {})

        # Batch Functions
        if functions:
            print(f"Batching {len(functions)} functions")
            prompt = build_batch_prompt(file_path, functions, "function")
            try:
                result = get_llm_response(prompt).strip()
                updated_blocks.append(result)
            except Exception as e:
                print(f"Error processing functions in {file_path}: {e}")

        # Batch Classes
        if classes:
            print(f"Batching {len(classes)} classes")
            prompt = build_batch_prompt(file_path, classes, "class")
            try:
                result = get_llm_response(prompt).strip()
                updated_blocks.append(result)
            except Exception as e:
                print(f"Error processing classes in {file_path}: {e}")

        if updated_blocks:
            modified_files[file_path] = "\n\n".join(updated_blocks)

    state.modified_files = modified_files
    return state
