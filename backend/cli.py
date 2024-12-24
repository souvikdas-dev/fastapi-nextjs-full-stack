import click
from sqlalchemy.orm import Session

from core.database import drop_db as dropdb
from core.database import engine
from core.database import init_db as initdb


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


if __name__ == "__main__":
    cli()
