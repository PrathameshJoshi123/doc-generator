import os
import re
import time
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response_commenting
import random

CHUNK_SIZE = 300
CHUNK_OVERLAP = 10

def split_code_into_chunks(code: str, lines_per_chunk=CHUNK_SIZE, overlap=CHUNK_OVERLAP) -> list[str]:
    lines = code.splitlines()
    chunks = []
    for i in range(0, len(lines), lines_per_chunk - overlap):
        chunk = "\n".join(lines[i:i + lines_per_chunk])
        chunks.append(chunk)
    return chunks

def build_file_prompt(lang: str, chunk_code: str) -> str:
    prompt = f"""You are a highly skilled, professional {lang} developer.

Your task: Add clear, concise, professional docstrings or inline comments to the following code wherever they are needed to clarify purpose, behavior, and improve understanding.

⚠️ Very important instructions:
- Return ONLY the fully modified {lang} code block.
- Do NOT include any explanations, reasoning steps, or additional text.
- Do NOT include markdown formatting or ``` code fences.
- Do NOT change or reformat existing code logic in any way. Only add docstrings or comments where needed.

Start your output directly with the modified code.

### Code:
{chunk_code}
"""
    return prompt

def safe_llm_call(prompt: str, max_retries: int = 5, base_wait: float = 2.0) -> str:
    for attempt in range(max_retries):
        try:
            return get_llm_response_commenting(prompt).strip()
        except Exception as e:
            wait_time = base_wait * (2 ** attempt) + random.uniform(0, 1)
            if "429" in str(e) or "rate limit" in str(e).lower():
                print(f"Rate limit hit or transient error. Retrying in {wait_time:.1f}s... (Attempt {attempt+1}/{max_retries})")
                time.sleep(wait_time)
            else:
                print(f"LLM call failed: {e}")
                raise
    raise RuntimeError("LLM call failed after maximum retries.")

def remove_think_blocks(text: str) -> str:
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()

def add_docstrings(state: DocGenState) -> DocGenState:
    print("Inside DocStrings")

    if not state.preferences.add_inline_comments or not state.parsed_data:
        return state

    file_path = state.current_file_path
    file_data = state.parsed_data["repo_path"].get(file_path)

    if not file_data:
        return state

    file_code = file_data.get("code", "")
    if not file_code.strip():
        return state

    lang = os.path.splitext(file_path)[1].lstrip(".") or "text"
    chunks = split_code_into_chunks(file_code)

    updated_chunks = []

    for idx, chunk in enumerate(chunks):
        print(f"Processing chunk {idx + 1}/{len(chunks)} for {file_path}")
        prompt = build_file_prompt(lang, chunk)
        try:
            result = safe_llm_call(prompt)
            cleaned_result = remove_think_blocks(result)
            updated_chunks.append(cleaned_result)
        except Exception as e:
            print(f"Error processing chunk {idx + 1} in {file_path}: {e}")

    final_code = "\n\n".join(updated_chunks)

    if not state.modified_files:
        state.modified_files = {}

    state.modified_files[file_path] = final_code

    return state
