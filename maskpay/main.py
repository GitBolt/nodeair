from fastapi import FastAPI
from routers import auth

app = FastAPI()
app.include_router(auth.router)


@app.get("/", description="Index page")
async def root():
    return {"message": "Welcome"}