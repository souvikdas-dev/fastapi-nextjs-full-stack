from fastapi import FastAPI

# from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from core.dependencies import TokenDep
from routes import auth

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
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": settings.PROJECT_NAME}


@app.get("/items/")
async def read_items(token: TokenDep):
    return {"token": token}
