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
You are an expert technical writer and developer documentation specialist.

Your task is to generate a clear, accurate, and production-ready `README.md` file for the following codebase, using only the provided summaries and folder structure.

This README will serve as the entry point for developers, maintainers, or users of the project.

IMPORTANT:
- Return only valid, complete, and clean markdown.
- Do not include internal thoughts, reasoning steps, or any content inside <think> or similar tags.
- Your output should start directly with the first markdown heading, such as `# Project Title`.
- Do NOT include backticks around markdown output. This must be raw `.md` content.

### 🔒 Rules:
- Do **NOT** make assumptions or invent functionality not explicitly mentioned.
- Use **only** the given code summaries and folder structure.
- Do **NOT** include markdown code blocks (e.g., no backticks, no fenced sections).
- Do **NOT** include conversational content, thoughts, or system messages — only the final clean `README.md` body.
- Every section must be technically relevant. If information is missing, omit the section entirely.
- Avoid emojis, decorative characters, or stylistic formatting that may not be portable or supported.
- Keep all section titles professional and standard: e.g., `Project Overview`, `Folder Structure`, `Features`, `Installation`, `Usage`, `Code Summary`, `API Reference`, etc.

### ✅ Output Format:
Include a cleanly structured Markdown README using appropriate headings (`#`, `##`, etc.). Suggested sections (only include if applicable):

1. `# Project Name` — If not available, leave it out.
2. `## Project Overview` — Describe what the project does, its purpose, and context.
3. `## Folder Structure` — Explain key folders and their roles.
4. `## Code Summary` — Summarize the main files, classes, and functions from the code summaries.
5. `## Installation / Setup` — Provide basic setup or environment instructions if any.
6. `## Usage` — Outline how to run or use the project.
7. `## API Reference` — If the project exposes any APIs or CLI tools, document them briefly.
8. `## Contributing` — Optional section if code appears extensible.
9. `## License` — Add only if mentioned explicitly in folder or summaries.
- Output must be in raw, valid, and properly formatted **Markdown** only.
- Do **not** include any reasoning, commentary, or planning text like <think> or explanations.
- Do **not** wrap the markdown inside code blocks (e.g., no triple backticks).
- Start the output directly with the first markdown heading, like `# Project Title`.
- Ensure proper spacing, list formatting, and heading levels throughout.

This README will be saved as a `.md` file — ensure it's immediately usable.
---

### 📁 Folder Structure:
{folder_structure}

---

### 📄 Code Summaries:
{summaries_text}

---

Only return the final, cleaned-up `README.md` content in valid Markdown. Do not include explanations, markdown fences, or commentary.
"""

    

    readme_text = clean_llm_markdown_response(get_llm_response_readme(prompt))
    readme_text = readme_text.replace("\\n", "\n")

    print("readme\n", readme_text)
    state.readme = readme_text.strip()
    return state

import re

def clean_llm_markdown_response(raw_response: str) -> str:
    # Remove any <think>...</think> blocks
    cleaned = re.sub(r"<think>.*?</think>", "", raw_response, flags=re.DOTALL).strip()
    # Optionally remove any backticks or non-markdown wrappers
    cleaned = re.sub(r"^```(?:markdown)?\n?", "", cleaned)
    cleaned = re.sub(r"\n?```$", "", cleaned)
    return cleaned.strip()