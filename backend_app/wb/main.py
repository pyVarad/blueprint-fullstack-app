import logging
from contextlib import asynccontextmanager

import uvicorn
from configs.logger import configure_logging
from fastapi import FastAPI

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    logger.info("Bootstrapping the application.")
    yield


app = FastAPI()


@app.get("/")
def greetings():
    return {"message": "Hello World!!!"}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
