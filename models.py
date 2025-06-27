# models.py
from pydantic import BaseModel
from typing import Optional

class Paper(BaseModel):
    title: str
    abstract: Optional[str] = ""
    authors: Optional[str] = ""
    year: Optional[int]
    link: Optional[str]
