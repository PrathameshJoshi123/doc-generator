from app.models.state import DocGenState
from app.utils.mistral import get_llm_response_readme

def generate_readme(state: DocGenState) -> DocGenState:
    print("Inside readme")
    if not state.preferences.generate_readme:
        return state
    
    folder_structure = "\n".join(sorted(state.working_dir.keys())) if state.working_dir else "Not Availabe"
    summaries_section = []

    if state.readme_summaries:
        for file, summary in state.readme_summaries.items():
            summaries_section.append(f"#### `{file}`\n- {summary}")

    
    summaries_text = "\n\n".join(summaries_section)

    prompt = f"""
        You are an expert technical writer.

        Your task is to generate a professional and comprehensive `README.md` file for a codebase. The goal is to provide clarity, encourage maintainability, and assist developers in understanding the structure and purpose of the project.

        ## Guidelines:
        - **Do not invent** content such as APIs or functionality. Use only the provided summaries and folder structure.
        - Write clear, technically accurate, and well-formatted markdown.
        - Ensure consistent section formatting with proper markdown headers and lists.

        ---

        ## 📁 Project Overview:
        - Briefly describe the purpose and functionality of the codebase.
        - Note that this tool accepts frontend/backend code or GitHub links as input.

        ---

        ## 📄 Code Summaries:
        Summarize key components, classes, and functions based on the analysis below:

        {summaries_text}

        ---

        ## 📌 API Reference:
        List any available API endpoints or methods. If not found leave it no need  to add anything.

        ---

        ## 🛠️ Usage Instructions:
        Provide a basic guide on how to run or use the project locally. You may include steps for setting up environments, dependencies, or scripts.

        ---

        Return only valid markdown content. Do not include explanations or preambles. Focus on technical accuracy and clarity.
        Note that is something is not applicable to the code leave it.
"""
    

    readme_text = get_llm_response_readme(prompt=prompt)
    print("readme\n", readme_text)
    state.readme = readme_text.strip()
    return state