from langgraph.graph import StateGraph, END
from app.models.state import DocGenState
from app.graph.nodes.fetch_code import fetch_code
from app.graph.nodes.parse_code import parse_code
from app.graph.nodes.summarize_code import summarize_code_node
from app.graph.nodes.add_docstrings import add_docstrings
from app.graph.nodes.combined_node import docstring_and_summary_node  # new combined node
from app.graph.nodes.generate_readme import generate_readme
from app.graph.nodes.visualize_code import visualize_code_node
from app.graph.nodes.output_node import output_node


def decide_doc_summary_path(state: DocGenState) -> str:
    if state.preferences.add_inline_comments and state.preferences.generate_summary:
        print("docstring_and_summary")
        return "docstring_and_summary"
    elif state.preferences.add_inline_comments:
        print("add_docstrings")
        return "add_docstrings"
    elif state.preferences.generate_summary:
        print("summarize_node")
        return "summarize_node"
    else:
        # If neither is selected, skip to readme generation
        return "generate_readme"


def build_graph():
    builder = StateGraph(DocGenState)

    # Nodes
    builder.add_node("fetch_code", fetch_code)
    builder.add_node("parse_code", parse_code)
    builder.add_node("summarize_node", summarize_code_node)
    builder.add_node("add_docstrings", add_docstrings)
    builder.add_node("docstring_and_summary", docstring_and_summary_node)  # new combined node
    builder.add_node("generate_readme", generate_readme)
    builder.add_node("visualize_code", visualize_code_node)
    builder.add_node("output", output_node)

    # Entry & Static Edges
    builder.set_entry_point("fetch_code")
    builder.add_edge("fetch_code", "parse_code")

    # Conditional branching after parse_code
    builder.add_conditional_edges("parse_code", decide_doc_summary_path)

    # Common edges
    builder.add_edge("summarize_node", "generate_readme")
    builder.add_edge("add_docstrings", "generate_readme")
    builder.add_edge("docstring_and_summary", "generate_readme")

    builder.add_edge("generate_readme", "visualize_code")
    builder.add_edge("visualize_code", "output")
    builder.add_edge("output", END)

    return builder.compile()
