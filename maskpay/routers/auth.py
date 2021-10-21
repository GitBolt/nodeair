from fastapi import APIRouter
from core.models import User
from core.db import USERS

router = APIRouter()

@router.post("/register")
async def register(user: User):
    user = user.dict()
    await USERS.insert_one(user)

