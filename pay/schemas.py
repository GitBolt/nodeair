from datetime import datetime
from sqlalchemy import (
                        Column, 
                        String, 
                        Integer, 
                        DateTime, 
                        ForeignKey
                        )
from sqlalchemy.orm import relationship
from db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    username = Column(String(length=15))
    public_key = Column(String(length=44))
    joined_at = Column(DateTime, default=datetime.utcnow)
    avatar = Column(String(100), default=(
                    "https://res.cloudinary.com/f22/image"
                    "/upload/v1635015065/Test/avatar.png"
                    ))

    links = relationship("Link", back_populates="owner")


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    link = Column(String(30))
    expiration = Column(DateTime, nullable=True)
    uses = Column(Integer, default=0)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="links")