from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from core.dependencies import SessionDep
from core.security import (
    authenticate_user,
    generate_jwt,
    get_password_hash,
)
from models import User
from schemas import Token, UserSignupRequest

router = APIRouter(tags=["auth"])


@router.post("/singup")
async def singup(user: UserSignupRequest, db: SessionDep) -> Token:
    """register api"""
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
    return Token(access_token=generate_jwt({"user_id": db_user.id}))


@router.post("/login")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """

    user = authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    # The response of the token endpoint must be a JSON object.
    # It should have a token_type. In our case, as we are using "Bearer" tokens, the token type should be "bearer".
    # And it should have an access_token, with a string containing our access token.
    return Token(access_token=generate_jwt({"user_id": user.id}))
