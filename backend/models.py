from datetime import datetime

import click
from sqlalchemy import String, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class AutoReprMixin:
    """Mixin to automatically create a __repr__ method based on model columns."""

    def __repr__(self):
        # Create a list of the model's column names and their values
        fields = [
            f"{column.name}={repr(getattr(self, column.name))}"
            for column in self.__table__.columns
        ]
        return click.style(
            f"\n<{self.__class__.__name__}({', '.join(fields)})>\n", fg="magenta"
        )


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        default=func.now(), onupdate=func.now()
    )


class User(Base, TimestampMixin, AutoReprMixin):
    __tablename__ = "users"

    # Allowing autoincrement behavior Using the AUTOINCREMENT Keyword on the primary key
    # __table_args__ = {"sqlite_autoincrement": True}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(255))
    is_active: Mapped[bool | None] = mapped_column(default=True, nullable=False)
    is_superuser: Mapped[bool | None] = mapped_column(default=False, nullable=False)

    # def __repr__(self) -> str:
    #     return f"User(id={self.id!r}, name={self.name!r}, email={self.email!r}, password={self.password!r}, is_superuser={self.is_superuser!r}, is_active={self.is_active!r})"


class Item(Base, TimestampMixin, AutoReprMixin):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    description: Mapped[str | None] = mapped_column(String(255), index=True)
    owner_id: Mapped[int | None] = mapped_column(foreign_key="users.id")
