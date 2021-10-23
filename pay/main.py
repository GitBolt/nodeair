from fastapi import FastAPI, HTTPException
from fastapi.param_functions import Depends
from sqlalchemy.orm import Session

from schemas import User
from models import RegisterUser
from db import engine, SessionLocal, Base


Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Welcome"}

@app.post("/register")
async def register(user: RegisterUser, 
                    db: Session = Depends(get_db)):
    get_user = db.query(User).filter(User.public_key == user.public_key).first()
    if get_user:
        raise HTTPException(status_code=400, detail="Public key already registered")
    else:
        db_user = User(username=user.username, public_key = user.public_key)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user