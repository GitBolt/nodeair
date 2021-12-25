import string
from core.db import get_db
from core.schemas import User
from core.ratelimit import Limit
from sqlalchemy.orm import Session
from core.models import CheckUser
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/checks")

@router.post("/taken_fields", 
            dependencies=[Depends(Limit(times=20, seconds=5))],
            status_code=200
            )
async def check(
                user: CheckUser, request: Request, db: Session=Depends(get_db)
                ) -> JSONResponse:

    r = await request.body()
    print("taken_fields check body: ", r, "\n")
    if user.username in ["about", "dashboard", "insights", "discover", "pricing", "edit", "settings", "notifications"]:
        return JSONResponse(
            status_code=400,
            content={"error": "You cannot keep this username"}
        )

    allowed_chars = ["_", "-", "0", "1","2","3","4","5","6","7","8","9"]
    allowed_letters = list(string.ascii_lowercase)
    allowed_chars.extend(allowed_letters)
    
    if len([i for i in user.username.lower() if i not in allowed_chars]) > 0:
        return JSONResponse(
            status_code=400,
            content={
                "error": "Username can only contain letters, numbers, '_' and '-'"}
        )

    get_user = db.query(User).filter(
                                    (User.username == user.username) |
                                    (User.public_key == user.public_key)
                                    ).first()
    if get_user:
        if get_user.public_key == user.public_key:
            field = "Public key"
        else:
            field = "Username"             
        return JSONResponse(
                status_code=400, 
                content={"error": f"{field} already registered", "username": get_user.username}
                )    
 
    else:
        return JSONResponse(
            content={"valid": True}
        )

@router.get("/user/{public_key}", 
            dependencies=[Depends(Limit(times=20, seconds=5))],
            status_code=200
            )
async def check(public_key: str, db: Session=Depends(get_db)
                ) -> JSONResponse:

    get_user = db.query(User).filter_by(public_key=public_key).first()
    if not get_user:
        return JSONResponse(
            content={"exists": False},
            status_code=404
        )
    return {"exists": True, "username": get_user.username}