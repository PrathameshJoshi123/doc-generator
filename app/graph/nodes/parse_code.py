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


EXCLUDED_FOLDERS = {
    "node_modules", "venv", ".venv", "env", ".env",
    ".git", ".idea", ".vscode", "__pycache__",
    "dist", "build", ".next", "out", ".parcel-cache",
    "coverage", "logs", "tmp", "temp",
}

EXCLUDED_FILES = {
    # Node & frontend
    "package.json", "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb",
    "vite.config.ts", "vite.config.js", "webpack.config.js", "rollup.config.js",
    "esbuild.config.js", "snowpack.config.js", "metro.config.js", "vite-env.d.ts"

    # TypeScript
    "tsconfig.json", "tsconfig.app.json", "tsconfig.node.json", "tsconfig.base.json",
    "tslint.json",

    # Linters & formatters
    "eslint.config.js", ".eslintrc.js", ".eslintrc.json", ".prettierrc", ".prettierrc.js",
    ".prettierrc.json", ".stylelintrc", ".stylelintrc.json", "stylelint.config.js",

    # Tailwind / PostCSS / CSS
    "tailwind.config.js", "postcss.config.js", "babel.config.js", ".babelrc", ".babelrc.js",

    # HTML & meta
    "index.html", "favicon.ico", "robots.txt", "sitemap.xml",

    # General dotfiles & environment
    ".editorconfig", ".gitignore", ".gitattributes", ".npmrc", ".nvmrc", ".dockerignore",
    ".env", ".env.local", ".env.development", ".env.production", ".env.test",

    # Test & coverage
    "jest.config.js", "jest.config.ts", "karma.conf.js", "mocha.opts", "vitest.config.ts",
    "cypress.config.js", "cypress.json", ".coveragerc", "tox.ini", "pytest.ini", "setup.cfg",

    # CI/CD & build
    "vercel.json", "netlify.toml", "now.json", "firebase.json", "azure-pipelines.yml",
    "Procfile", "Makefile", "Dockerfile", "docker-compose.yml", ".travis.yml",
    ".circleci/config.yml", ".github/workflows/main.yml", ".gitlab-ci.yml",

    # Docs & community
    "README.md", "README", "CONTRIBUTING.md", "CHANGELOG.md", "CODEOWNERS",
    "LICENSE", "LICENSE.md", "SECURITY.md", "SUPPORT.md", "NOTICE", "AUTHORS",

    # Python/ML specific
    "requirements.txt", "Pipfile", "Pipfile.lock", "pyproject.toml", "setup.py", "MANIFEST.in",
    "environment.yml", "conda.yml", ".python-version", ".pylintrc",
    "mypy.ini", "pyrightconfig.json", ".flake8", ".isort.cfg",

    # ML experiment logs & artifacts
    "mlruns", "dvc.yaml", "dvc.lock", ".dvc", "wandb", ".mlflow", ".mlem", "output.log",
    "checkpoints", "runs", "events.out.tfevents.*", "tensorboard.log", "lightning_logs",

    # Jupyter / notebooks
    ".ipynb_checkpoints", "*.ipynb",

    # Misc logs & locks
    "yarn-error.log", "npm-debug.log", "snapshot.txt", "poetry.lock", "poetry.toml",

    # Cloud & infra
    "terraform.tf", "terraform.tfvars", "*.tfstate", "*.tfstate.backup",
    "cloudbuild.yaml", ".helmignore", "Chart.yaml", "values.yaml",
    "kustomization.yaml", "skaffold.yaml",

    # Mac, Windows system files
    ".DS_Store", "Thumbs.db", "desktop.ini",
}

# Markers that indicate virtual environments
VENV_MARKERS = {"bin", "lib", "pyvenv.cfg", "Scripts", "Include"}

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

def is_virtual_env(folder_path: str) -> bool:
    try:
        entries = set(os.listdir(folder_path))
        return bool(entries & VENV_MARKERS)
    except Exception:
        return False

def walk_folder(base_path: str):
    structure = {}

    for root, dirs, files in os.walk(base_path):
        # Remove unwanted dirs
        filtered_dirs = []
        for d in dirs:
            d_path = os.path.join(root, d)
            if d in EXCLUDED_FOLDERS:
                continue
            if is_virtual_env(d_path):
                print(f"Skipping virtual environment folder: {d_path}")
                continue
            filtered_dirs.append(d)

        # Update dirs in place so os.walk does not traverse excluded dirs
        dirs[:] = filtered_dirs

        for file in files:
            if file in EXCLUDED_FILES:
                continue

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

def parse_code(state: DocGenState):
    all_parsed = {}

    working_dir = state.working_dir
    print(f"Parsing code from: {working_dir}")

    if isinstance(working_dir, dict):
        for section, path in working_dir.items():
            parsed = walk_folder(path)
            if parsed:
                all_parsed[section] = parsed
    else:
        raise ValueError("Invalid working_dir format")

    state.parsed_data = all_parsed
    return state