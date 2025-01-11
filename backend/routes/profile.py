from typing import Annotated

from fastapi import APIRouter, Form

from core.dependencies import SessionDep, CurrentUserDep
from schemas import ProfileUpadteRequest

router = APIRouter(prefix="/profile", tags=["profile"])


@router.patch("/")
def update_profile(
    session: SessionDep,
    active_user: CurrentUserDep,
    request: Annotated[ProfileUpadteRequest, Form()],
):
    if request.name is not None:
        active_user.name = request.name
    if request.email is not None:
        active_user.email = request.email

    session.commit()
    session.refresh(active_user)

    return {
        "status": "profile-updated",
        "message": "Profile updated successfully",
        "data": active_user,
    }
