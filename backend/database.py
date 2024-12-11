from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from models import Base, User
from security import get_password_hash

POSTGRES_SERVER = "localhost"
POSTGRES_PORT = 5432
POSTGRES_DB = "fnfs"
POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "password"

engine = create_engine("sqlite:///database.sqlite", echo=True)

FIRST_SUPERUSER_NAME = "admin"
FIRST_SUPERUSER = "admin@example.com"
FIRST_SUPERUSER_PASSWORD = "password"


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    Base.metadata.create_all(engine)

    # check if super user exists
    super_user = session.query(User).filter_by(email=FIRST_SUPERUSER).first()

    if not super_user:
        super_user = User(
            name=FIRST_SUPERUSER_NAME,
            email=FIRST_SUPERUSER,
            password=get_password_hash(FIRST_SUPERUSER_PASSWORD),
            is_superuser=True,
        )

        session.add(super_user)
        session.commit()
        session.refresh(super_user)


def drop_db():
    """
    docstring
    """
    Base.metadata.drop_all(engine)
