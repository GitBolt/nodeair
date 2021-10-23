from fastapi import FastAPI
from routers import auth
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()
app.include_router(auth.router)


@app.on_event("startup")
async def startup_db_client():
    app.db_client = AsyncIOMotorClient("localhost:27017")
    app.db = app.mongodb_client["Database"]

@app.on_event("shutdown")
async def shutdown_db_client():
    await app.db_client.close()


@app.get("/", description="Index page")
async def root():
    return {"message": "Welcome"}

