# app/utils/file_ops.py

import os
import base64
import zipfile

import os
import requests
import zipfile
import io

def clone_github_repo(repo_url: str, custom_path: str) -> str:
    print(f"[DEBUG] Downloading ZIP of {repo_url} into {custom_path}")
    
    # Normalize repo URL and construct zip URL
    if repo_url.endswith("/"):
        repo_url = repo_url[:-1]
    if repo_url.startswith("https://github.com/"):
        zip_url = repo_url + "/archive/refs/heads/main.zip"
    else:
        raise ValueError("Only GitHub HTTPS URLs are supported")

    # Download and extract
    os.makedirs(custom_path, exist_ok=True)
    response = requests.get(zip_url)
    if response.status_code != 200:
        raise Exception(f"Failed to download repo ZIP: {response.status_code}")

    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_file:
        zip_file.extractall(custom_path)

    print("[DEBUG] Repository downloaded and extracted successfully.")

    return custom_path

def extract_zip_file(base64_data: str, dest_dir: str) -> str:
    os.makedirs(dest_dir, exist_ok=True)  # Ensure target directory exists

    zip_data = base64.b64decode(base64_data)
    zip_path = os.path.join(dest_dir, "code.zip")

    with open(zip_path, "wb") as f:
        f.write(zip_data)

    extract_path = os.path.join(dest_dir, "extracted")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

    return extract_path
