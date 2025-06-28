from langgraph.graph import StateGraph, END
from app.models.state import DocGenState
from app.graph.nodes.fetch_code import fetch_code
from app.graph.nodes.parse_code import parse_code
from app.graph.nodes.summarize_code import summarize_code_node
from app.graph.nodes.add_docstrings import add_docstrings
from app.graph.nodes.generate_readme import generate_readme
from app.graph.nodes.visualize_code import visualize_code_node
from app.graph.nodes.output_node import output_node


def summarize_and_comment_node(state: DocGenState) -> DocGenState:
    """
    For each file, run summarization and add docstrings sequentially.
    """
    repo_data = state.parsed_data.get("repo_path", {})
    for file_path in repo_data.keys():
        state.current_file_path = file_path
        state = summarize_code_node(state)
        state = add_docstrings(state)
    return state


def summarize_only_node(state: DocGenState) -> DocGenState:
    """
    For each file, run summarization only.
    """
    repo_data = state.parsed_data.get("repo_path", {})
    for file_path in repo_data.keys():
        state.current_file_path = file_path
        state = summarize_code_node(state)
    return state


def decide_doc_summary_path(state: DocGenState) -> str:
    if state.preferences.add_inline_comments:
        print("Path: summarize_and_comment")
        return "summarize_and_comment"
    else:
        print("Path: summarize_only")
        return "summarize_only"


def build_graph():
    builder = StateGraph(DocGenState)

    # Nodes
    builder.add_node("fetch_code", fetch_code)
    builder.add_node("parse_code", parse_code)
    builder.add_node("summarize_and_comment", summarize_and_comment_node)
    builder.add_node("summarize_only", summarize_only_node)
    builder.add_node("generate_readme", generate_readme)
    builder.add_node("visualize_code", visualize_code_node)
    builder.add_node("output", output_node)

    # Entry point
    builder.set_entry_point("fetch_code")

    # Edges
    builder.add_edge("fetch_code", "parse_code")
    builder.add_conditional_edges("parse_code", decide_doc_summary_path)
    builder.add_edge("summarize_and_comment", "generate_readme")
    builder.add_edge("summarize_only", "generate_readme")
    builder.add_edge("generate_readme", "visualize_code")
    builder.add_edge("visualize_code", "output")
    builder.add_edge("output", END)

    return builder.compile()
