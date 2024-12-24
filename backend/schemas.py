from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    ValidationInfo,
    field_validator,
    model_validator,
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
    password: str = Field(min_length=8)  # Password should be at least 8 characters long
    confirm_password: str

    # @model_validator(mode="after")
    # def check_passwords_match(self):
    #     if self.password != self.confirm_password:
    #         raise ValueError("The :attribute field confirmation does not match.")
    #     return self

    @field_validator("confirm_password", mode="after")
    @classmethod
    def check_passwords_match(cls, value: str, info: ValidationInfo) -> str:
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


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
