from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

todos_router = r = APIRouter()

@r.get(
    "/todos",
)
def get_fixed_json():
    return [
    {
        "id": 1, 
        "title": "todo1", 
        "completed": "false" 
    },
    {
        "id": 2, 
        "title": "todo2", 
        "completed": "true" 
    },
    {
        "id": 3, 
        "title": "todo3", 
        "completed": "true" 
    }
    ]