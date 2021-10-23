from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from core.models import User
from fastapi.responses import JSONResponse
from solana.rpc.async_api import AsyncClient

router = APIRouter()

@router.post("/register")
async def register(request: Request, user: User):
    user_dict = jsonable_encoder(user)
    db_user = user_dict.copy()

    client = AsyncClient("https://api.devnet.solana.com")
    verify = await client.get_balance(user_dict["public_key"])
    await client.close()

    if "error" in verify.keys(): # Big brain right here
        message = jsonable_encoder({"error:" "Invalid public key"})
        return JSONResponse(content=message, status_code=406)
    else:
        await request.app.db.insert_one(db_user)
        return JSONResponse(content=user_dict, status_code=201)

@router.get("/{link}")
async def link(request: Request, link):
   links = [link["links"][0] async for link in request.app.db.find({}, {"links"})]
   print(links)
