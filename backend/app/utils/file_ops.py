import os
import base64
import zipfile
import requests
import io

def clone_github_repo(repo_url: str, repo_id: str, branch: str = "main") -> str:
    temp_dir = f"/tmp/ClonedRepos/{repo_id}"
    os.makedirs(temp_dir, exist_ok=True)
    zip_url = repo_url.rstrip("/") + f"/archive/refs/heads/{branch}.zip"
    zip_path = os.path.join(temp_dir, "repo.zip")
    response = requests.get(zip_url)
    response.raise_for_status()
    with open(zip_path, "wb") as f:
        f.write(response.content)
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)
    extracted_folder_name = os.listdir(temp_dir)
    extracted_folder_name = [name for name in extracted_folder_name if os.path.isdir(os.path.join(temp_dir, name)) and name != "__MACOSX"]
    if extracted_folder_name:
        extracted_path = os.path.join(temp_dir, extracted_folder_name[0])
        return extracted_path
    else:
        return temp_dir

def extract_zip_file(base64_data: str, dest_dir: str) -> str:
    base_temp_dir = f"/tmp/ClonedRepos/{dest_dir}"
    os.makedirs(base_temp_dir, exist_ok=True)
    zip_data = base64.b64decode(base64_data)
    zip_path = os.path.join(base_temp_dir, "code.zip")
    with open(zip_path, "wb") as f:
        f.write(zip_data)
    extract_path = os.path.join(base_temp_dir, "extracted")
    os.makedirs(extract_path, exist_ok=True)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    return extract_path
