from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from core.dependencies import DBSessionDep
from core.security import generate_jwt, get_password_hash, verify_password
from models import User
from schemas import Token, UserRegister

router = APIRouter(tags=["auth"])


@router.post("/register")
async def register(user: UserRegister, db: DBSessionDep) -> Token:
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


@router.post("/token")
def login_access_token(
    session: DBSessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """

    def authenticate_user(
        *, session: Session, email: str, password: str
    ) -> User | None:
        db_user = session.query(User).filter_by(email=email).first()
        if not db_user:
            return None
        if not verify_password(password, db_user.password):
            return None
        return db_user

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
