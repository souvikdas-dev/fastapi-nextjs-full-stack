from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from core.config import settings
from core.security import get_password_hash
from models import Base, User

engine = create_engine(settings.SQLITE_URL, echo=True)


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    Base.metadata.create_all(engine)

    # check if super user exists
    super_user = session.query(User).filter_by(email=settings.SUPERUSER_EMAIL).first()

    if not super_user:
        super_user = User(
            name=settings.SUPERUSER_NAME,
            email=settings.SUPERUSER_EMAIL,
            password=get_password_hash(settings.SUPERUSER_PASSWORD),
            is_superuser=True,
        )

        session.add(super_user)
        session.commit()
        session.refresh(super_user)


def drop_db() -> None:
    """
    docstring
    """
    Base.metadata.drop_all(engine)
