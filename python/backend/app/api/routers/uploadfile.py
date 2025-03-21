from fastapi import APIRouter, Request, Depends, UploadFile, File, HTTPException
from pydantic import BaseModel
import typing as t

from db.db import get_db
from core.auth import get_current_active_user
from core.storage.blob import upload_file_to_blob

uploadfile_router = r = APIRouter()

class UploadResponse(BaseModel):
    filename: str
    url: str
    size: int
    content_type: str

@r.post(
    "/uploadfile",
    response_model=UploadResponse,
    response_model_exclude_none=True,
)
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Upload a file to Azure Blob Storage
    """
    try:
        # Upload the file to Azure Blob Storage
        blob_url = await upload_file_to_blob(file)
        
        # Return the file information
        return UploadResponse(
            filename=file.filename,
            url=blob_url,
            size=file.size,
            content_type=file.content_type
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
