from typing import Annotated
from fastapi import Depends
from sqlalchemy.orm import Session
from database import engine


def get_db():
    with Session(engine) as session:
        yield session


DBSessionDep = Annotated[Session, Depends(get_db)]
