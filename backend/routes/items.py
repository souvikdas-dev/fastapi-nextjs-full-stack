from fastapi import APIRouter, HTTPException

from core.dependencies import SessionDep
from models import Item
from schemas import ItemCreate, ItemResponse, ItemUpdate

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=list[ItemResponse])
def read_items(session: SessionDep, skip: int = 0, limit: int = 10):
    items = session.query(Item).offset(skip).limit(limit).all()

    return items


@router.get("/{id}", response_model=ItemResponse)
def read_item(session: SessionDep, id: int):
    item = session.get(Item, id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    return item


@router.post("/")
def create_item(session: SessionDep, item: ItemCreate):
    item_db = Item(**item.model_dump())
    session.add(item_db)
    session.commit()
    session.refresh(item_db)

    return item_db


@router.put("/{id}", response_model=ItemResponse)
def update_item(session: SessionDep, id: int, item: ItemUpdate):
    item_db = session.get(Item, id)
    if not item_db:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in item.model_dump().items():
        if value is not None:
            setattr(item_db, key, value)

    session.commit()
    session.refresh(item_db)

    return item_db


@router.delete("/{id}")
def delete_item(session: SessionDep, id: int):
    item = session.get(Item, id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    session.delete(item)
    session.commit()

    return {"message": "Item deleted successfully"}
