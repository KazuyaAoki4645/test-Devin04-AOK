import os
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from fastapi import UploadFile
import uuid
from dotenv import load_dotenv

load_dotenv()

# Use environment variables or default to dummy values
BLOB_STORAGE_URL = os.getenv("BLOB_STORAGE_URL", "https://XXXXX.blob.core.windows.net/")
SAS_TOKEN = os.getenv("SAS_TOKEN", "XXXXX")
CONTAINER_NAME = os.getenv("CONTAINER_NAME", "uploads")

async def upload_file_to_blob(file: UploadFile) -> str:
    """
    Upload a file to Azure Blob Storage
    
    Args:
        file: The file to upload
        
    Returns:
        The URL of the uploaded file
    """
    try:
        # Create a unique blob name
        blob_name = f"{uuid.uuid4()}-{file.filename}"
        
        # Create blob service client
        blob_service_client = BlobServiceClient(account_url=BLOB_STORAGE_URL, credential=SAS_TOKEN)
        
        # Get container client
        container_client = blob_service_client.get_container_client(CONTAINER_NAME)
        
        # Get blob client
        blob_client = container_client.get_blob_client(blob_name)
        
        # Read file content
        file_content = await file.read()
        
        # Upload file
        blob_client.upload_blob(file_content)
        
        # Return the blob URL
        return f"{BLOB_STORAGE_URL}{CONTAINER_NAME}/{blob_name}"
    except Exception as e:
        print(f"Error uploading file to blob storage: {e}")
        raise e
