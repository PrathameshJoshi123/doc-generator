# app/graph/graph.py

from langgraph.graph import StateGraph, END
from app.models.state import DocGenState
from app.graph.nodes.fetch_code import fetch_code
from app.graph.nodes.parse_code import parse_code
from app.graph.nodes.summarize_code import summarize_code_node
from app.graph.nodes.add_docstrings import add_docstrings
from app.graph.nodes.generate_readme import generate_readme
from app.graph.nodes.visualize_code import visualize_code_node
from app.graph.nodes.output_node import output_node


def build_graph():
    builder = StateGraph(DocGenState)

    builder.add_node("fetch_code", fetch_code)
    builder.add_node("parse_code", parse_code)
    builder.add_node("summarize_node", summarize_code_node)
    builder.add_node("add_docstrings", add_docstrings)
    builder.add_node("generate_readme", generate_readme)
    builder.add_node("visualize_code", visualize_code_node)
    builder.add_node("output", output_node)
    
    builder.set_entry_point("fetch_code")
    builder.add_edge("fetch_code", "parse_code")
    builder.add_edge("parse_code", "summarize_node")
    builder.add_edge("summarize_node", "add_docstrings")
    builder.add_edge("add_docstrings", "generate_readme")
    builder.add_edge("generate_readme", "visualize_code")
    builder.add_edge("visualize_code", "output")
    builder.add_edge("output", END)

    return builder.compile()
