#!/usr/bin/env python3

from db.db import get_db
from db.crud import create_user
from db.schemas import UserCreate
from db.db import SessionLocal, engine , DATABASE_URL
from db.models import Base
import urllib
from urllib.parse import unquote

from dotenv import load_dotenv
import os 

env_path = './db/.env'

load_dotenv(env_path)
username = "XXXX"  # Replaced with dummy value
password = "XXXX"  # Replaced with dummy value

def init() -> None:
    print("接続を開始...")
    print(f"接続先URL: {unquote(DATABASE_URL)}")
    db = SessionLocal()

    Base.metadata.create_all(bind = engine)

    create_user(
        db,
        UserCreate(
            email=username,
            password=password,
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    print("Creating superuser {}".format(username))
    init()
    print("Superuser created")
