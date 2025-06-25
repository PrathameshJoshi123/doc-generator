# app/main.py

import base64
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.graph.graph import build_graph
from app.models.state import DocGenState
from fastapi.responses import StreamingResponse
import io
import zipfile
import json

app = FastAPI()
graph = build_graph()

# Optional: allow frontend access if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate_docs(
    input_type: str = Form(...),  # "github", "zip", or "upload"
    input_data: str = Form(None),
    zip_file: UploadFile = File(None)
):
    # Handle zip upload
    if input_type == "zip" and zip_file:
        content = await zip_file.read()
        base64_zip = base64.b64encode(content).decode("utf-8")
        state = DocGenState(input_type="zip", input_data=base64_zip)
    else:
        # Handle GitHub or pasted upload
        state = DocGenState(input_type=input_type, input_data=input_data)

    result = graph.invoke(state)

    return {
        "readme": result.get("readme"),
        "summaries": result.get("summaries"),
        "modified_files": result.get("modified_files"),
        "visuals": result.get("visuals"),
        "folder_tree": result.get("folder_tree"),
        "input_type": result.get("input_type")
    }

@app.post("/download-zip")
async def download_modified_zip(modified_files_json: str = Form(...)):
    modified_files = json.loads(modified_files_json)
    zip_stream = io.BytesIO()

    with zipfile.ZipFile(zip_stream, "w", zipfile.ZIP_DEFLATED) as zf:
        for filepath, code in modified_files.items():
            zf.writestr(filepath, code)

    zip_stream.seek(0)
    return StreamingResponse(
        zip_stream,
        media_type="application/x-zip-compressed",
        headers={"Content-Disposition": "attachment; filename=modified_code.zip"}
    )

@app.post("/generate-and-download")
async def generate_and_download(
    input_type: str = Form(...),
    input_data: str = Form(None),
    zip_file: UploadFile = File(None)
):
    # Prepare initial state
    if input_type == "zip" and zip_file:
        content = await zip_file.read()
        base64_zip = base64.b64encode(content).decode("utf-8")
        state = DocGenState(input_type="zip", input_data=base64_zip)
    else:
        state = DocGenState(input_type=input_type, input_data=input_data)

    result = graph.invoke(state)
    modified_files = result.get("modified_files", {})
    print("modified_files", modified_files)
    readme = result.get("readme")

    # Create ZIP with files
    zip_stream = io.BytesIO()
    with zipfile.ZipFile(zip_stream, "w", zipfile.ZIP_DEFLATED) as zf:
        # Add modified files
        for filepath, code in modified_files.items():
            zf.writestr(filepath, code)
        # Add README if present
        if readme:
            zf.writestr("README.md", readme)

    zip_stream.seek(0)

    return StreamingResponse(
        zip_stream,
        media_type="application/x-zip-compressed",
        headers={"Content-Disposition": "attachment; filename=docgen_output.zip"}
    )