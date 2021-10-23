from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    username: str
    public_key: str
    links: list
    avatar: Optional[str]
    banner: Optional[str]
    joined: datetime = datetime.utcnow()

