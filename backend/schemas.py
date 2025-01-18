from datetime import datetime

import arrow
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    ValidationInfo,
    computed_field,
    field_validator,
)
from pydantic_core import PydanticCustomError

from core.validators import NameStr


class UserBase(BaseModel):
    name: str
    email: EmailStr
    is_superuser: bool
    is_active: bool


class UserSignupRequest(BaseModel):
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


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    @computed_field
    @property
    def last_updated(self) -> str:
        return arrow.get(self.updated_at).to("local").humanize()


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

    @computed_field
    @property
    def last_updated(self) -> str:
        return arrow.get(self.updated_at).to("local").humanize()
        # return humanize.naturaltime(self.updated_at)


class ItemPaginateResponse(BaseModel):
    total: int
    per_page: int
    current_page: int
    last_page: int
    from_: int
    to_: int
    data: list[ItemResponse]


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProfileUpadteRequest(BaseModel):
    name: NameStr | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
