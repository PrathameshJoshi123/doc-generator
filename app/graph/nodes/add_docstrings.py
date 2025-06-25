import os
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response


def build_prompt(code: str, file_path: str, entity_type: str) -> str:
    lang = os.path.splitext(file_path)[1].lstrip(".")
    return f"""You are a professional {lang} developer.

            Add a concise, professional documentation comment **above the following {entity_type}**.

            ⚠️ Return **ONLY** the full modified {lang} code — no explanation, no markdown formatting, no extra text.

            DO NOT include \`\`\` or say "here is...". Just return the updated code.

            And dont make any changes to logic of the code it should be intact.

            Just add a comment Docstring

            ```{lang}
            {code}
            ```"""

def add_docstrings(state: DocGenState) -> DocGenState:
    """
    Adds inline docstrings to parsed functions and classes using Mistral.
    Stores updated code in state.modified_files.
    """

    print("Inside DocStirngs")

    if not state.preferences.add_inline_comments or not state.parsed_data:
        return state
    
    modified_files = {}
    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        updated_blocks = []

        print("Processing file:", file_path)

        functions = file_data.get("functions", {})
        classes = file_data.get("classes", {})

        # Process Functions
        for func_code, func_name in functions.items():
            print("Function:", func_name)
            prompt = build_prompt(func_code, file_path=file_path, entity_type="function")
            updated_code = get_llm_response(prompt=prompt).strip()
            updated_blocks.append(updated_code)

        for class_code, class_name in classes.items():
            print("Class:", class_name)
            prompt = build_prompt(class_code, file_path=file_path, entity_type="class")
            updated_code = get_llm_response(prompt=prompt)
            updated_blocks.append(updated_code)
        
        modified_files[file_path] = '\n\n'.join(updated_blocks)

    state.modified_files = modified_files
    return state    