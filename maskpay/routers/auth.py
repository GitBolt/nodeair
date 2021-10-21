from fastapi import APIRouter
from core.models import User
from core.db import USERS
from solana.rpc.async_api import AsyncClient

router = APIRouter()

@router.post("/register")
async def register(user: User):
    user = user.dict()
    async with AsyncClient("https://api.devnet.solana.com") as client:
        verify = await client.get_balance(user["address"])
        if "error" in verify.keys():
            return {"error": "Invalid address"} # Big brain right here
        else:
            await USERS.insert_one(user)
            return {"message": f"Successfully registered: {user['address']}"}

