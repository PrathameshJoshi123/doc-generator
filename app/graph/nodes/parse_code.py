import os
from app.models.state import DocGenState
from tree_sitter import Parser, Language

# Import tree-sitter language bindings
import tree_sitter_python as tspython
import tree_sitter_java as tsjava
import tree_sitter_javascript as tsjs
import tree_sitter_html as tshtml
import tree_sitter_typescript as tsts
import tree_sitter_css as tscss
import tree_sitter_c as tsc
import tree_sitter_cpp as tscpp
import tree_sitter_go as tsgo
import tree_sitter_kotlin as tskotlin

# Language registry
LANGUAGE_MAP = {
    "python": tspython.language(),
    "java": tsjava.language(),
    "javascript": tsjs.language(),
    "typescript": tsts.language_typescript(),
    "tsx": tsts.language_tsx(),
    "html": tshtml.language(),
    "css": tscss.language(),
    "c": tsc.language(),
    "cpp": tscpp.language(),
    "go": tsgo.language(),
    "kotlin": tskotlin.language(),
}

LANGUAGE_EXTENSIONS = {
    "python": [".py"],
    "java": [".java"],
    "javascript": [".js"],
    "typescript": [".ts"],
    "tsx": [".tsx"],
    "html": [".html"],
    "css": [".css"],
    "c": [".c", ".h"],
    "cpp": [".cpp", ".cc", ".cxx", ".hpp", ".h"],
    "go": [".go"],
    "kotlin": [".kt"],
}


def detect_language(file_name: str):
    for lang, extensions in LANGUAGE_EXTENSIONS.items():
        if any(file_name.endswith(ext) for ext in extensions):
            return lang
    return None


def extract_names(source_code: str, lang_key: str):
    language = Language(LANGUAGE_MAP.get(lang_key))
    if not language:
        return []

    parser = Parser(language)
    tree = parser.parse(bytes(source_code, "utf-8"))
    root_node = tree.root_node

    cursor = root_node.walk()
    visited = set()
    found_names = []

    while True:
        node = cursor.node
        if node.id in visited:
            if cursor.goto_next_sibling():
                continue
            if not cursor.goto_parent():
                break
            continue

        visited.add(node.id)

        if node.type in [
            "function_definition", "function_declaration", "method_definition", "method_declaration",
            "class_definition", "class_declaration", "class_specifier", "struct_specifier", "type_declaration"
        ]:
            name_node = node.child_by_field_name("name")
            if name_node:
                name = source_code[name_node.start_byte:name_node.end_byte]
                found_names.append(name.strip())

        if cursor.goto_first_child():
            continue
        if cursor.goto_next_sibling():
            continue
        while not cursor.goto_next_sibling():
            if not cursor.goto_parent():
                break

    return found_names


def walk_folder(base_path: str):
    structure = {}

    for root, _, files in os.walk(base_path):
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, base_path)

            lang = detect_language(file)
            if not lang:
                continue

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    source_code = f.read()
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
                continue

            contains = extract_names(source_code, lang)

            structure[rel_path] = {
                "file": rel_path,
                "code": source_code,
                "type": lang,
                "contains": contains
            }

    return structure


def parse_code(state: DocGenState) -> DocGenState:
    all_parsed = {}

    working_dir = state.working_dir
    print(working_dir)

    if isinstance(working_dir, dict):  # Zip structure
        for section, path in working_dir.items():
            parsed = walk_folder(path)
            if parsed:
                all_parsed[section] = parsed
    else:
        raise ValueError("Invalid working_dir format")

    state.parsed_data = all_parsed
    return state
