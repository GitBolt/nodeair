import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

def get_db_url() -> str:
    try:
        return os.environ["DB_URL"]
    except KeyError:
        print(
            "'DB_URL' environment variable not found,",
            "creating 'db.sql locally...'"
            )
        return "sqlite:///../db.sql"

engine = create_engine(get_db_url())
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()