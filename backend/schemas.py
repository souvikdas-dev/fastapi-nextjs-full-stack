from datetime import datetime
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    ValidationInfo,
    field_validator,
)
from pydantic_core import PydanticCustomError

from core.validators import NameStr


class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    password: str
    is_superuser: bool
    is_active: bool


class UserRegister(BaseModel):
    name: NameStr = Field(
        min_length=3, max_length=50
    )  # name should be between 3 to 50 characters
    email: EmailStr
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)

    @field_validator("confirm_password", mode="after")
    @classmethod
    def check_passwords_match(cls, value: str, info: ValidationInfo) -> str:
        if "password" in info.data:
            if value != info.data["password"]:
                # raise ValueError(
                #     f"The {info.field_name} field confirmation does not match."
                # )
                raise PydanticCustomError(
                    "confirmation_mismatch",
                    "The {attribute} field confirmation does not match.",
                    {"attribute": "password", "extra_context": "extra_data"},
                )
        return value


class ItemBase(BaseModel):
    name: str
    description: str | None = None
    price: float | None = None

    model_config = ConfigDict(from_attributes=True)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    name: str | None


class ItemResponse(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
