from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import func, select

from core.dependencies import CurrentUserDep, SessionDep
from models import Item
from schemas import ItemBase, ItemCreate, ItemPaginateResponse, ItemResponse, ItemUpdate
from rich import print

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=ItemPaginateResponse)
def read_items(
    session: SessionDep, page: int = Query(1, ge=1), limit: int = Query(10, le=100)
):
    total = session.scalar(select(func.count(Item.id)))
    print(total)
    offset = (page - 1) * limit
    print(offset)
    items = session.query(Item).offset(offset).limit(limit).all()
    print(items)

    # print(ItemBase(**items[0]))

    return {
        "total": total,
        "per_page": limit,
        "current_page": page,
        "last_page": (total // limit) + (1 if total % limit > 0 else 0),
        "from_": offset + 1,
        "to_": offset + len(items),
        "data": items,
        # "data": [ItemResponse.model_validate(item) for item in items],
    }


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
