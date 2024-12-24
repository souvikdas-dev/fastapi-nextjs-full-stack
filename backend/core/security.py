from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from core.config import settings

ALGORITHM = "HS256"


def generate_jwt(payload: dict, expiration_minutes: int | None) -> str:
    """
    Generates a JWT (JSON Web Token).

    :param payload: Dictionary containing the claims to include in the JWT (e.g., user data).
    :param expiration_minutes: The expiration time in minutes (default is 8 days, i.e., 8*24*60 minutes).
    :return: The signed JWT token.
    """
    # Set the expiration time (default is 8 days)
    expiration_minutes = expiration_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=expiration_minutes)

    # Add expiration time to payload
    payload["exp"] = expiration_time

    # Generate JWT token (using the default 'HS256' algorithm)
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)

    return token


def decode_jwt(token: str) -> dict:
    """
    Decodes a JWT (JSON Web Token).

    :param token: The JWT token to decode.
    :return: The decoded payload.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        payload = {}

    return payload


def verify_password(password: str, hashed_password: str) -> bool:
    password = password.encode("utf-8")  # Convert string to bytes
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode("utf-8")
    return bcrypt.checkpw(password, hashed_password)


def get_password_hash(password: str) -> str:
    password = password.encode("utf-8")  # Convert string to bytes
    return bcrypt.hashpw(password, bcrypt.gensalt())


if __name__ == "__main__":
    # test cases
    password = "password"
    hashed_password = get_password_hash(password)

    print(f"pwd_context.hash({password}!r) = {hashed_password}!r")

    if verify_password(password, hashed_password):
        print("It Matches!")
    else:
        print("It Does not Match :(")
