from motor.motor_asyncio import AsyncIOMotorClient

CLIENT = AsyncIOMotorClient("localhost:27017")
DB = CLIENT["Database"]

# Collections
USERS = DB["Users"]