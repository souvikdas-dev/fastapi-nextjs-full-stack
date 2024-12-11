import click
from sqlalchemy.dialects import sqlite
from sqlalchemy.orm import Session
from sqlalchemy.schema import CreateTable

from database import drop_db as dropdb
from database import engine
from database import init_db as initdb
from models import User


@click.group()
def cli():
    """
    docstring
    """
    pass


@cli.command()
def init_db():
    with Session(engine) as session:
        initdb(session)
    click.echo("Initialized the database")


@cli.command()
def drop_db():
    dropdb()
    click.echo("Dropped the database")


@cli.command()
def test():
    """
    docstring
    """
    super_user = User(
        name="name",
        email="email@example.com",
        password="password",
        # is_superuser=True,
    )

    print(super_user)

    print(CreateTable(User.__table__).compile(dialect=sqlite.dialect()))


if __name__ == "__main__":
    cli()
