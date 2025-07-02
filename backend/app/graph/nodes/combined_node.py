import os
import time
import re
from app.models.state import DocGenState
from app.utils.mistral import get_llm_response_summary, get_llm_response_commenting

CHUNK_SIZE = 300  # lines per chunk
CHUNK_OVERLAP = 10  # overlap to preserve context


def get_comment_syntax(lang: str) -> dict:
    lang = lang.lower()
    if lang in ["py", "python"]:
        return {"start": "\"\"\"", "end": "\"\"\""}
    elif lang in ["js", "ts", "java", "c", "cpp"]:
        return {"start": "/**", "end": "*/"}
    elif lang in ["go"]:
        return {"start": "//", "end": ""}
    elif lang in ["rb", "swift"]:
        return {"start": "///", "end": ""}
    elif lang in ["css"]:
        return {"start": "/*", "end": "*/"}
    elif lang in ["html", "htm"]:
        return {"start": "<!--", "end": "-->"}
    else:
        return {"start": "//", "end": ""}


def split_code_into_chunks(code: str, lines_per_chunk=CHUNK_SIZE, overlap=CHUNK_OVERLAP) -> list[str]:
    lines = code.splitlines()
    chunks = []
    for i in range(0, len(lines), lines_per_chunk - overlap):
        chunk = "\n".join(lines[i:i + lines_per_chunk])
        chunks.append(chunk)
    return chunks


def build_injection_prompt(file_content: str, lang: str) -> str:
    comment_style = get_comment_syntax(lang)
    return f"""You are a professional {lang} developer and technical writer.

Your job is to review the following {lang} source file and add helpful documentation **comments only**.

Strict instructions:
1. Analyze the full code to understand its structure and behavior.
2. Insert Comments in between where u find it is necesary to comment.
3. Do not add lines like following:-
Here is the modified code with added documentation comments:
```
4. **Do NOT modify** any code. Only insert comments.
5. Preserve original formatting and indentation.
6. Do NOT use Markdown or backticks. Return raw source code with inserted comments only.
7. Do NOT give like ```python or ```java just as the input code is given return it in same format.

Here is the code:
{file_content}
"""


def build_summary_prompt(file_code: str, lang: str, symbols: list[str]) -> str:
    prompt = (
        f"You are a senior software engineer reviewing the following {lang} source file.\n"
        f"For every function or class defined in this file, write a strict, technical 1-3 lines summary "
        f"explaining its purpose and behavior. Do NOT include any general description of the file.\n\n"
        f"### Code:\n{file_code.strip()}"
    )
    return prompt


def safe_llm_call(task: str, prompt: str, retries: int = 3, delay: int = 60) -> str:
    for attempt in range(1, retries + 1):
        try:
            if task == "summary":
                return get_llm_response_summary(prompt).strip()
            elif task == "commenting":
                return get_llm_response_commenting(prompt).strip()
        except Exception as e:
            if "429" in str(e):
                print(f"[Rate Limit] Waiting {delay}s before retry... (Attempt {attempt}/{retries})")
                time.sleep(delay)
            else:
                print(f"LLM call failed: {e}")
                raise
    raise Exception("Max retries reached for LLM call")


def inject_docstrings_into_code(file_code: str, lang: str) -> str:
    chunks = split_code_into_chunks(file_code)
    annotated_chunks = []
    for chunk in chunks:
        prompt = build_injection_prompt(chunk, lang)
        annotated = safe_llm_call(task="commenting", prompt=prompt)
        annotated_chunks.append(annotated)
    return "\n\n".join(annotated_chunks)


def generate_summary_for_symbols(file_code: str, lang: str, symbols: list[str]) -> list[dict]:
    chunks = split_code_into_chunks(file_code)
    structured_summaries = []
    for chunk in chunks:
        prompt = build_summary_prompt(chunk, lang, symbols)
        response = safe_llm_call(task="summary", prompt=prompt)

        print("summary_llm_response:\n", response)
        structured_summaries.append(response)
    return structured_summaries


def docstring_and_summary_node(state: DocGenState) -> DocGenState:
    """
    Processes the code by injecting docstrings and generating summaries separately.
    Supports chunking to handle large files.
    """
    if not (state.preferences.add_inline_comments and state.preferences.generate_summary):
        return state

    modified_files = {}
    summaries = {}
    readme_summaries = {}

    repo_data = state.parsed_data.get("repo_path", {})

    for file_path, file_data in repo_data.items():
        file_code = file_data.get("code", "")
        language = file_data.get("type", "text")
        symbols = file_data.get("contains", [])

        if not file_code.strip():
            continue

        try:
            # 1. Inject comments with chunking
            injected_code = inject_docstrings_into_code(file_code, language)
            print("injected_code:\n", injected_code)
            modified_files[file_path] = injected_code

            # 2. Generate summaries with chunking
            structured_summaries = generate_summary_for_symbols(file_code, language, symbols)
            print("summary:\n", structured_summaries)
            if structured_summaries:
                summaries[file_path] = "\n".join(
                    [f"- {s['symbol']}: {s['summary']}" if s['symbol'] else f"- {s['summary']}" for s in structured_summaries]
                )

                symbol_names = [s for s in symbols if isinstance(s, str)]
                contains_summaries = [s['symbol'] for s in structured_summaries if s['symbol'] in symbol_names]

                readme_summaries[file_path] = {
                    "file": file_path,
                    "summary": ". ".join(s['summary'] for s in structured_summaries),
                    "type": language,
                    "contains": contains_summaries or symbol_names
                }

        except Exception as e:
            print(f"[Error] Failed to process {file_path}: {e}")
            print(f"[Prompt Preview] {file_code[:300]}...")

    state.modified_files = modified_files
    state.summaries = summaries
    state.readme_summaries = list(readme_summaries.values())

    return state
