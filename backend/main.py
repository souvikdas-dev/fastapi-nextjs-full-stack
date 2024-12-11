from fastapi import FastAPI
from routes import auth

app = FastAPI(title="Fastapi Next.js full-stack-backend")
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
