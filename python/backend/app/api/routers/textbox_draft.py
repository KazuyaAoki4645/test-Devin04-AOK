from fastapi import APIRouter, Request, Depends, Response
import typing as t

from db.db import get_db
from db.crud import create_textbox_draft
from db.schemas import TextboxDraftCreate, TextboxDraft
from core.auth import get_current_active_user

textbox_draft_router = r = APIRouter()

@r.post(
    "/textbox_draft",
    response_model=TextboxDraft,
    response_model_exclude_none=True,
)
async def save_textbox_draft(
    request: Request,
    draft: TextboxDraftCreate,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Save a draft of text from the text editor
    """
    return create_textbox_draft(db, draft)
