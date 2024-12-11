from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
import bcrypt

SECRET_KEY = "f77f215d8c1059155587e62be85d351ecb2cdf2e78d2fcea22fe07945e004a6d"
ALGORITHM = "HS256"


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


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
