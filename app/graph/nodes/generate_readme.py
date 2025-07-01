# # from app.models.state import DocGenState
# # from app.utils.mistral import get_llm_response_readme

# # def generate_readme(state: DocGenState) -> DocGenState:
# #     print("Inside readme")
# #     if not state.preferences.generate_readme:
# #         return state
    
# #     folder_structure = "\n".join(sorted(state.working_dir.keys())) if state.working_dir else "Not Availabe"
# #     summaries_section = []

# #     if state.readme_summaries:
# #         for file, summary in state.readme_summaries.items():
# #             summaries_section.append(f"#### `{file}`\n- {summary}")

    
# #     summaries_text = "\n\n".join(summaries_section)

# #     prompt = f"""
# # You are an expert technical writer and developer documentation specialist.

# # Your task is to generate a clear, accurate, and production-ready `README.md` file for the following codebase, using only the provided summaries and folder structure.

# # This README will serve as the entry point for developers, maintainers, or users of the project.

# # IMPORTANT:
# # - Return only valid, complete, and clean markdown.
# # - Do not include internal thoughts, reasoning steps, or any content inside <think> or similar tags.
# # - Your output should start directly with the first markdown heading, such as `# Project Title`.
# # - Do NOT include backticks around markdown output. This must be raw `.md` content.

# # ### 🔒 Rules:
# # - Do **NOT** make assumptions or invent functionality not explicitly mentioned.
# # - Use **only** the given code summaries and folder structure.
# # - Do **NOT** include markdown code blocks (e.g., no backticks, no fenced sections).
# # - Do **NOT** include conversational content, thoughts, or system messages — only the final clean `README.md` body.
# # - Every section must be technically relevant. If information is missing, omit the section entirely.
# # - Avoid emojis, decorative characters, or stylistic formatting that may not be portable or supported.
# # - Keep all section titles professional and standard: e.g., `Project Overview`, `Folder Structure`, `Features`, `Installation`, `Usage`, `Code Summary`, `API Reference`, etc.

# # ### ✅ Output Format:
# # Include a cleanly structured Markdown README using appropriate headings (`#`, `##`, etc.). Suggested sections (only include if applicable):

# # 1. `# Project Name` — If not available, leave it out.
# # 2. `## Project Overview` — Describe what the project does, its purpose, and context.
# # 3. `## Folder Structure` — Explain key folders and their roles.
# # 4. `## Code Summary` — Summarize the main files, classes, and functions from the code summaries.
# # 5. `## Installation / Setup` — Provide basic setup or environment instructions if any.
# # 6. `## Usage` — Outline how to run or use the project.
# # 7. `## API Reference` — If the project exposes any APIs or CLI tools, document them briefly.
# # 8. `## Contributing` — Optional section if code appears extensible.
# # 9. `## License` — Add only if mentioned explicitly in folder or summaries.
# # - Output must be in raw, valid, and properly formatted **Markdown** only.
# # - Do **not** include any reasoning, commentary, or planning text like <think> or explanations.
# # - Do **not** wrap the markdown inside code blocks (e.g., no triple backticks).
# # - Start the output directly with the first markdown heading, like `# Project Title`.
# # - Ensure proper spacing, list formatting, and heading levels throughout.

# # This README will be saved as a `.md` file — ensure it's immediately usable.
# # ---

# # ### 📁 Folder Structure:
# # {folder_structure}

# # ---

# # ### 📄 Code Summaries:
# # {summaries_text}

# # ---

# # Only return the final, cleaned-up `README.md` content in valid Markdown. Do not include explanations, markdown fences, or commentary.
# # """

    

# #     readme_text = clean_llm_markdown_response(get_llm_response_readme(prompt))
# #     readme_text = readme_text.replace("\\n", "\n")

# #     print("readme\n", readme_text)
# #     state.readme = readme_text.strip()
# #     return state

# # import re

# # def clean_llm_markdown_response(raw_response: str) -> str:
# #     # Remove any <think>...</think> blocks
# #     cleaned = re.sub(r"<think>.*?</think>", "", raw_response, flags=re.DOTALL).strip()
# #     # Optionally remove any backticks or non-markdown wrappers
# #     cleaned = re.sub(r"^```(?:markdown)?\n?", "", cleaned)
# #     cleaned = re.sub(r"\n?```$", "", cleaned)
# #     return cleaned.strip()

# import os
# import re
# import time
# from app.models.state import DocGenState
# from app.utils.mistral import get_llm_response_readme


# def clean_llm_markdown_response(raw_response: str) -> str:
#     """
#     Cleans the LLM response by removing markdown wrappers and internal tags like <think>.
#     """
#     # Remove any <think>...</think> blocks
#     cleaned = re.sub(r"<think>.*?</think>", "", raw_response, flags=re.DOTALL).strip()
#     # Remove Markdown fences or backticks
#     cleaned = re.sub(r"^```(?:markdown)?\n?", "", cleaned)
#     cleaned = re.sub(r"\n?```$", "", cleaned)
#     return cleaned.strip()


# def safe_llm_call(callable_fn, prompt: str, retries: int = 3, delay: int = 60) -> str:
#     """
#     Calls an LLM function with retry logic for rate-limiting or transient errors.
#     """
#     for attempt in range(1, retries + 1):
#         try:
#             return callable_fn(prompt).strip()
#         except Exception as e:
#             if "429" in str(e):
#                 print(f"[429 Rate Limit] Retrying in {delay}s... (Attempt {attempt}/{retries})")
#                 time.sleep(delay)
#             else:
#                 print(f"[LLM Error] {e}")
#                 raise
#     raise Exception("Max retries exceeded for LLM call")


# def generate_readme(state: DocGenState) -> DocGenState:
#     """
#     Generates a clean README.md for the project using summaries and folder structure.
#     Applies retry logic in case of LLM rate-limiting.
#     """
#     print("Inside readme")

#     if not state.preferences.generate_readme:
#         return state

#     # Use folder structure and summaries
#     folder_structure = "\n".join(sorted(state.working_dir.keys())) if state.working_dir else "Not Available"
#     summaries_section = []

#     if state.readme_summaries and isinstance(state.readme_summaries, list):
#         for item in state.readme_summaries:
#             file = item.get("file", "unknown")
#             summary = item.get("summary", "No summary available.")
#             ftype = item.get("type", "unknown")
#             contains = item.get("contains", [])

#             lines = [f"#### `{file}` ({ftype})"]
#             lines.append(f"- Summary: {summary}")
#             if contains:
#                 lines.append(f"- Contains: {', '.join(contains)}")

#             summaries_section.append("\n".join(lines))

#     summaries_text = "\n\n".join(summaries_section)

#     prompt =f"""
#             You are an expert technical writer. Generate a comprehensive, professional README.md in raw Markdown format for any given codebase.

#             CRITICAL INSTRUCTIONS:
#             - Analyze the provided code summaries to understand what this codebase contains
#             - Create a meaningful project title based on the actual code content and purpose
#             - Be precise and factual - only use information from the summaries provided
#             - Write in clear, professional language suitable for developers
#             - Do NOT add code examples, backticks, or wrap your response in markdown blocks
#             - Output ONLY the README content in plain markdown format
#             - Use appropriate emojis in section headers to make it visually appealing
#             - This should work for ANY type of repository (web dev, AI/ML, DSA, mobile apps, etc.)

#             OUTPUT FORMAT:

#             Start with H1 title based on the code content, followed immediately by a brief description paragraph (no "Project Overview" heading).

#             Then include these sections with emojis:
#             - 🚀 Features (list specific capabilities from summaries)  
#             - 🛠 Tech Stack (list technologies mentioned in summaries)
#             - 📁 Folder Structure (display the provided structure)
#             - 📋 Code Summary (comprehensive overview organized by Core Components, Supporting Modules, Configuration, Additional Features)
#             - ⚙ Installation (if and only if installation files mentioned)
#             - 🚀 Usage (if and only if usage info available in summaries)  
#             - 📝 API Reference (Include **ALL** API only if API endpoints present in summaries)

#             For Code Summary, organize with bold subheadings:
#             *Core Components, **Supporting Modules, **Configuration and Setup, **Additional Features*

#             Include file names, key functions/classes, and how components interact based on the summaries provided.

#             IMPORTANT: Do NOT add any meta-commentary about documentation generation. End naturally after the last relevant section.

#             ---
#             ### 📁 Folder Structure:
#             {folder_structure}
#             ---
#             ### 📄 Code Summaries:
#             {summaries_text}
#             ---
#             """


#     try:
#         raw_readme = safe_llm_call(get_llm_response_readme, prompt)
#         cleaned_readme = clean_llm_markdown_response(raw_readme).replace("\\n", "\n")
#         print("readme\n", cleaned_readme)
#         state.readme = cleaned_readme.strip()
#     except Exception as e:
#         print(f"[Error] Failed to generate README: {e}")
#         state.readme = ""

#     return state

import os
import re
import time
import random
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response_readme


def clean_llm_markdown_response(raw_response: str) -> str:
    """
    Cleans the LLM response by removing markdown wrappers and internal tags like <think>.
    """
    cleaned = re.sub(r"<think>.*?</think>", "", raw_response, flags=re.DOTALL).strip()
    cleaned = re.sub(r"^```(?:markdown)?\n?", "", cleaned)
    cleaned = re.sub(r"\n?```$", "", cleaned)
    return cleaned.strip()


def safe_llm_call(callable_fn, prompt: str, retries: int = 5, base_delay: int = 5) -> str:
    """
    Calls an LLM function with exponential backoff and jitter for rate limiting.
    """
    for attempt in range(1, retries + 1):
        try:
            return callable_fn(prompt).strip()
        except Exception as e:
            if "429" in str(e):
                delay = base_delay * (2 ** (attempt - 1)) + random.uniform(0, 3)
                print(f"[429 Rate Limit] Retrying in {delay:.1f}s... (Attempt {attempt}/{retries})")
                time.sleep(delay)
            else:
                print(f"[LLM Error] {e}")
                raise
    raise Exception("Max retries exceeded for LLM call")


def chunk_summaries(summaries, max_chars=6000):
    """
    Splits summaries into chunks so that each chunk stays within LLM input limits.
    """
    chunks = []
    current_chunk = []
    current_len = 0

    for s in summaries:
        s_len = len(s)
        if current_len + s_len > max_chars:
            chunks.append("\n\n".join(current_chunk))
            current_chunk = [s]
            current_len = s_len
        else:
            current_chunk.append(s)
            current_len += s_len

    if current_chunk:
        chunks.append("\n\n".join(current_chunk))

    return chunks


def generate_readme(state: DocGenState) -> DocGenState:
    """
    Generates a single, complete README.md using summaries and folder structure.
    Handles large codebases robustly with chunking and merging.
    """
    print("Inside readme")

    if not state.preferences.generate_readme:
        return state

    folder_structure = "\n".join(sorted(state.working_dir.keys())) if state.working_dir else "Not Available"
    summaries_section = []

    if state.readme_summaries and isinstance(state.readme_summaries, list):
        for item in state.readme_summaries:
            file = item.get("file", "unknown")
            summary = item.get("summary", "No summary available.")
            ftype = item.get("type", "unknown")
            contains = item.get("contains", [])

            lines = [f"#### `{file}` ({ftype})"]
            lines.append(f"- Summary: {summary}")
            if contains:
                lines.append(f"- Contains: {', '.join(contains)}")

            summaries_section.append("\n".join(lines))

    # Chunk large summaries
    chunks = chunk_summaries(summaries_section, max_chars=6000)

    partial_code_summaries = []
    for chunk_text in chunks:
        partial_prompt = f"""
You are an expert technical writer.

Generate only a **Code Summary** section in markdown based on these summaries. Do not include any other sections, no title, no folder structure. Only return the "Code Summary" section.

---
{chunk_text}
---
"""
        partial_summary_md = safe_llm_call(get_llm_response_readme, partial_prompt)
        cleaned_partial = clean_llm_markdown_response(partial_summary_md)
        partial_code_summaries.append(cleaned_partial)

    # Merge partial code summaries
    merged_code_summary = "\n\n".join(partial_code_summaries)

    # Final README prompt
    final_prompt = f"""
You are an expert technical writer. Generate a comprehensive, professional README.md in raw Markdown format for any given codebase.

CRITICAL INSTRUCTIONS:
- Analyze the provided code summaries to understand what this codebase contains
- Create a meaningful project title based on the actual code content and purpose
- Be precise and factual - only use information from the summaries provided
- Write in clear, professional language suitable for developers
- Do NOT add code examples, backticks, or wrap your response in markdown blocks
- Output ONLY the README content in plain markdown format
- Use appropriate emojis in section headers to make it visually appealing
- This should work for ANY type of repository (web dev, AI/ML, DSA, mobile apps, etc.)

OUTPUT FORMAT:

Start with H1 title based on the code content, followed immediately by a brief description paragraph (no "Project Overview" heading).

Then include these sections with emojis:
- 🚀 Features (list specific capabilities from summaries)  
- 🛠 Tech Stack (list technologies mentioned in summaries)
- 📁 Folder Structure (display the provided structure)
- 📋 Code Summary (comprehensive overview organized by Core Components, Supporting Modules, Configuration, Additional Features)
- ⚙ Installation (if and only if installation files mentioned)
- 🚀 Usage (if and only if usage info available in summaries)  
- 📝 API Reference (Include **ALL** API only if API endpoints present in summaries)

For Code Summary, organize with bold subheadings:
*Core Components, **Supporting Modules, **Configuration and Setup, **Additional Features*

Include file names, key functions/classes, and how components interact based on the summaries provided.

IMPORTANT: 
Do NOT add any meta-commentary about documentation generation. End naturally after the last relevant section.
Do NOT give folder structure 2 times only once and complete folder structure.
If any of the point mentioned above is not applicable dont give it no need to give and wirte not applicable.

---
### 📁 Folder Structure:
{folder_structure}
---
### 📄 Code Summaries:
{merged_code_summary}
---
"""

    try:
        final_readme_raw = safe_llm_call(get_llm_response_readme, final_prompt)
        final_readme_clean = clean_llm_markdown_response(final_readme_raw).replace("\\n", "\n")
        print("Generated README:\n", final_readme_clean)
        state.readme = final_readme_clean.strip()
    except Exception as e:
        print(f"[Error] Failed to generate README: {e}")
        state.readme = ""

    return state
