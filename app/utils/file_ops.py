# app/utils/file_ops.py

import os
import base64
import zipfile

import os
import requests
import zipfile
import io

# def clone_github_repo(repo_url: str, custom_path: str) -> str:
#     print(f"[DEBUG] Downloading ZIP of {repo_url} into {custom_path}")
    
#     # Normalize repo URL and construct zip URL
#     if repo_url.endswith("/"):
#         repo_url = repo_url[:-1]
#     if repo_url.startswith("https://github.com/"):
#         zip_url = repo_url + "/archive/refs/heads/main.zip"
#     else:
#         raise ValueError("Only GitHub HTTPS URLs are supported")

#     # Download and extract
#     os.makedirs(custom_path, exist_ok=True)
#     response = requests.get(zip_url)
#     if response.status_code != 200:
#         raise Exception(f"Failed to download repo ZIP: {response.status_code}")

#     with zipfile.ZipFile(io.BytesIO(response.content)) as zip_file:
#         zip_file.extractall(custom_path)

#     print("[DEBUG] Repository downloaded and extracted successfully.")

#     return custom_path

import os
import requests
import zipfile

def clone_github_repo(repo_url: str, repo_id: str, branch: str = "main") -> str:
    """
    Clone a GitHub repository (as zip) from a specific branch to a temporary folder.

    Args:
        repo_url: Base URL of the GitHub repository (e.g., "https://github.com/user/repo")
        repo_id: Unique identifier for local folder name.
        branch: Branch name to download (default is "main").

    Returns:
        Path to extracted folder.
    """
    # Base temporary directory
    temp_dir = f"/tmp/ClonedRepos/{repo_id}"
    os.makedirs(temp_dir, exist_ok=True)

    # Create zip URL for the given branch
    zip_url = repo_url.rstrip("/") + f"/archive/refs/heads/{branch}.zip"
    zip_path = os.path.join(temp_dir, "repo.zip")

    # Download zip file
    response = requests.get(zip_url)
    response.raise_for_status()

    # Save zip file locally
    with open(zip_path, "wb") as f:
        f.write(response.content)

    # Extract zip contents
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)

    # The extracted folder is usually named like: repo-branch
    extracted_folder_name = os.listdir(temp_dir)
    extracted_folder_name = [name for name in extracted_folder_name if os.path.isdir(os.path.join(temp_dir, name)) and name != "__MACOSX"]
    
    if extracted_folder_name:
        extracted_path = os.path.join(temp_dir, extracted_folder_name[0])
        return extracted_path
    else:
        # Fall back if can't detect subfolder
        return temp_dir
