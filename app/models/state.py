from typing import List, Optional, Union, Dict, Any
from pydantic import BaseModel, Field

class DocGenPreferences(BaseModel):
    add_inline_comments: bool
    generate_summary: bool
    generate_readme: bool
    visualize_structure: bool

class DocGenState(BaseModel):
    # Source of input
    input_type: str  # "github", "zip", "upload"
    input_data: Union[str, Dict]  # e.g. base64 zip

    # Intermediate paths
    working_dir: Optional[Dict[str, str]] = None  # {"full": ..., "frontend": ..., "backend": ...}
    current_file_path: Optional[str] = None

    # Parsed Output from treesitter
    parsed_data: Optional[Dict[str, Any]] = None  # rel_path: {functions/classes/etc}

    # AI-generated outputs
    summaries: Dict[str, str] = Field(default_factory=dict)  # rel_path: summary
    modified_files: Dict[str, str] = Field(default_factory=dict)  # rel_path: code with injected doc strings
    folder_tree: Optional[str] = None  # Markdown folder structure
    readme: Optional[str] = None  # Final generated readme
    visuals: Optional[Dict[str, str]] = None
    readme_summaries: Optional[List[Dict[str, Any]]] = None

    # User customization
    preferences: Optional[DocGenPreferences]

    branch: Optional[str] = None