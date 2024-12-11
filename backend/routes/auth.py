from datetime import timedelta
from fastapi import APIRouter, HTTPException, status

from models import User
from schemas import Token, UserCreate
from dependencies import DBSessionDep
from security import create_access_token, get_password_hash

# 60 minutes * 24 hours * 8 days = 8 days
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

router = APIRouter(tags=["auth"])


@router.post("/register")
async def register(user: UserCreate, db: DBSessionDep):
    """
    docstring
    """
    existing_user = db.query(User).filter_by(email=user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Create new user
    db_user = User(
        name=user.name,
        email=user.email,
        password=get_password_hash(user.password),
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # create & return access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=create_access_token(db_user.id, expires_delta=access_token_expires)
    )
