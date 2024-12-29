from fastapi import APIRouter, HTTPException

from core.dependencies import SessionDep
from models import Item

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/")
def read_items(session: SessionDep, skip: int = 0, limit: int = 10):
    items = session.query(Item).offset(skip).limit(limit).all()

    return items


@router.get("/{id}")
def read_item(session: SessionDep, id: int):
    item = session.get(Item, id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    return item


@router.post("/")
def create_item(session: SessionDep):
    pass


@router.put("/{id}")
def update_item(session: SessionDep, id: int):
    pass


@router.delete("/{id}")
def delete_item(session: SessionDep, id: int):
    item = session.get(Item, id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    session.delete(item)
    session.commit()

    return {"message": "Item deleted successfully"}
