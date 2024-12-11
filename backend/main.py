from fastapi import FastAPI

from dependencies import TokenDep
from routes import auth

app = FastAPI(title="Fastapi Next.js full-stack-backend")
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/items/")
async def read_items(token: TokenDep):
    return {"token": token}
