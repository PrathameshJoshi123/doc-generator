from app.models.state import DocGenState

def visualize_code_node(state: DocGenState) -> DocGenState:
    if not state.working_dir:
        return state
    
    visuals = {}
    edges = []

    for path in sorted(state.working_dir.keys()):
        parts = path.strip("/").split("/")
        for i in range(1, len(parts)):
            parent = "/".join(parts[:i])
            child = "/".join(parts[:i + 1])
            edges.append((parent, child))

    mermaid_lines = ["graph Id"]

    for parent, child in edges:
        # Sanitize node names (replace special characters)
        p_node = parent.replace(".", "_").replace("-", "_")
        c_node = child.replace(".", "_").replace("-", "_")
        mermaid_lines.append(f'  "{p_node}" --> "{c_node}"')

    visuals["folder_structure_mermaid"] = "\n".join(mermaid_lines)
    state.visuals = visuals
    return state