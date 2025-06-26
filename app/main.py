# app/main.py

import base64
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.graph.graph import build_graph
from app.models.state import DocGenState, DocGenPreferences
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
    #allow_credentials=True,
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
        state = DocGenState(input_type="zip", input_data=base64_zip, preferences=DocGenPreferences(
        add_inline_comments=False,
        generate_readme=True,
        generate_summary=True,
        visualize_structure=True
    ))
    else:
        # Handle GitHub or pasted upload
        state = DocGenState(input_type=input_type, input_data=input_data, preferences=DocGenPreferences(
        add_inline_comments=False,
        generate_readme=True,
        generate_summary=True,
        visualize_structure=True
    ))

    result = graph.invoke(state)

    response= {
        "readme": result.get("readme"),
            "summaries": result.get("summaries"),
            "modified_files": result.get("modified_files"),
            "visuals": result.get("visuals"),
            "folder_tree": result.get("folder_tree"),
            "input_type": result.get("input_type")
    }
    print(response)
    
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

from fastapi.responses import JSONResponse
import uuid

# In-memory store (in production, use Redis or a DB)
zip_store = {}

@app.post("/generate-and-download")
async def generate_and_download(
    input_type: str = Form(...),
    input_data: str = Form(None),
    zip_file: UploadFile = File(None)
):
    if input_type == "zip" and zip_file:
        content = await zip_file.read()
        base64_zip = base64.b64encode(content).decode("utf-8")
        state = DocGenState(input_type="zip", input_data=base64_zip, preferences=DocGenPreferences(
        add_inline_comments=True,
        generate_readme=True,
        generate_summary=True,
        visualize_structure=True
    ))
    else:
        state = DocGenState(input_type=input_type, input_data=input_data, preferences=DocGenPreferences(
        add_inline_comments=True,
        generate_readme=True,
        generate_summary=True,
        visualize_structure=True
    ))

    result = graph.invoke(state)
    modified_files = result.get("modified_files", {})
    readme = result.get("readme")

    # Create ZIP
    zip_stream = io.BytesIO()
    with zipfile.ZipFile(zip_stream, "w", zipfile.ZIP_DEFLATED) as zf:
        for filepath, code in modified_files.items():
            zf.writestr(filepath, code)
        if readme:
            zf.writestr("README.md", readme)
    zip_stream.seek(0)

    # Generate a unique download ID
    download_id = str(uuid.uuid4())
    zip_store[download_id] = zip_stream.getvalue()  # Save raw bytes

    # Return JSON metadata + download URL
    return {
        "download_url": f"/download-zip/{download_id}",
        "readme": result.get("readme"),
        "summaries": result.get("summaries"),
        "modified_files": result.get("modified_files"),
        "visuals": result.get("visuals"),
        "folder_tree": result.get("folder_tree"),
        "input_type": result.get("input_type")
    }

@app.get("/download-zip/{download_id}")
def download_zip(download_id: str):
    zip_bytes = zip_store.get(download_id)
    if not zip_bytes:
        return JSONResponse({"error": "Invalid or expired download ID"}, status_code=404)

    return StreamingResponse(
        io.BytesIO(zip_bytes),
        media_type="application/x-zip-compressed",
        headers={"Content-Disposition": "attachment; filename=docgen_output.zip"}
    )
