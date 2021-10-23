from datetime import datetime
from sqlalchemy import (Column, String, 
                        Integer, DateTime, 
                        ForeignKey)
from sqlalchemy.orm import relationship
from db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(length=15))
    public_key = Column(String(length=44))
    joined_at = Column(DateTime, default=datetime.utcnow)
    avatar = Column(String, 
                    default=("https://cdn.discordapp.com/attachments/"
                            "807140294764003350/901514551890178058/avatar.png")
                    )

    links = relationship("Link", back_populates="owner")


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    link = Column(String)
    expiration = Column(DateTime)
    uses = Column(Integer, default=0)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="links")