from sqlalchemy import Boolean, Column, Integer, String

from .db import Base

class HelloWorld(Base):
    __tablename__ = "helloworld"
    
    id = Column(String, primary_key = True, index = True)
    name = Column(String)
    
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
