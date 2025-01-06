from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

# from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from core.dependencies import CurrentUserDep
from routes import auth, items
from utils import format_validation_errors
from validation import VALIDATION_MESSAGES

app = FastAPI(title=settings.PROJECT_NAME)
# origins = [
#     "http://localhost",
#     "http://localhost:8080",
# ]


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    # return PlainTextResponse(str(exc), status_code=400)
    return JSONResponse(
        status_code=422,
        content={"detail": format_validation_errors(exc, VALIDATION_MESSAGES)},
    )


app.include_router(auth.router)
app.include_router(items.router)


@app.get("/")
def root():
    return {"message": settings.PROJECT_NAME}


@app.post("/users/me")
async def get_auth_user(user: CurrentUserDep):
    return user
