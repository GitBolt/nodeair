from datetime import datetime
from pydantic import BaseModel

class User(BaseModel):
    address: str
    joined: datetime = datetime.utcnow()

