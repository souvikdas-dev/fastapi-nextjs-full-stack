from pydantic import BaseModel, EmailStr


class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    password: str
    is_superuser: bool
    is_active: bool


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    password_confirmation: str


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
