
from pydantic import (
    BaseModel,
    EmailStr,
    Field,
)

from validators import NameStr


class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    password: str
    is_superuser: bool
    is_active: bool


class UserCreate(BaseModel):
    name: NameStr = Field(
        min_length=3, max_length=50
    )  # name should be between 3 to 50 characters
    email: EmailStr
    password: str = Field(min_length=8)  # Password should be at least 8 characters long
    confirm_password: str

    # @model_validator(mode="after")
    # def check_passwords_match(self):
    #     if self.password != self.password_repeat:
    #         raise ValueError("Passwords do not match")
    #     return self


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
