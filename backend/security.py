from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

SECRET_KEY = "f77f215d8c1059155587e62be85d351ecb2cdf2e78d2fcea22fe07945e004a6d"
ALGORITHM = "HS256"
# 60 minutes * 24 hours * 8 days = 8 days
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8


def generate_jwt(payload: dict, expiration_minutes: int = 8 * 24 * 60):
    """
    Generates a JWT (JSON Web Token).

    :param payload: Dictionary containing the claims to include in the JWT (e.g., user data).
    :param expiration_minutes: The expiration time in minutes (default is 8 days, i.e., 8*24*60 minutes).
    :return: The signed JWT token.
    """

    # Secret key (you can change this for production or pass it as an argument)
    secret_key = SECRET_KEY  # Replace with your actual secret key

    # Set the expiration time (default is 8 days)
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=expiration_minutes)

    # Add expiration time to payload
    payload["exp"] = expiration_time

    # Generate JWT token (using the default 'HS256' algorithm)
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    return token


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
