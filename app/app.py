import streamlit as st
import requests
import base64
import json

API_URL = "http://localhost:8000"

st.title("📄 GitHub / Codebase Documentation Generator")

st.sidebar.header("Input Options")
input_type = st.sidebar.selectbox("Select input type", ["zip", "github"])
download_zip = st.sidebar.checkbox("Download output as ZIP")

# Prepare input
if input_type == "zip":
    zip_file = st.file_uploader("Upload a ZIP file", type=["zip"])
    input_data = None
else:
    zip_file = None
    input_data = st.text_input("Enter GitHub repo URL")

if st.button("Generate Documentation"):

    with st.spinner("Processing..."):
        if download_zip:
            endpoint = f"{API_URL}/generate-and-download"
        else:
            endpoint = f"{API_URL}/generate"

        form_data = {
            "input_type": input_type,
            "input_data": input_data
        }

        files = None
        if zip_file is not None:
            files = {"zip_file": zip_file}

        response = requests.post(endpoint, data=form_data, files=files)

        if response.status_code == 200:
            if download_zip:
                st.success("Download ready!")
                st.download_button(
                    label="📦 Download ZIP",
                    data=response.content,
                    file_name="docgen_output.zip",
                    mime="application/x-zip-compressed"
                )
            else:
                data = response.json()

                if readme := data.get("readme"):
                    st.subheader("📘 README Preview")
                    st.markdown(f"```markdown\n{readme}\n```")

                if summaries := data.get("summaries"):
                    st.subheader("🧠 Summaries")
                    for file, summary in summaries.items():
                        st.markdown(f"**{file}**\n\n{summary}")

                if tree := data.get("folder_tree"):
                    st.subheader("📂 Folder Tree")
                    st.code(tree, language="text")
        else:
            st.error(f"Error: {response.status_code}")
