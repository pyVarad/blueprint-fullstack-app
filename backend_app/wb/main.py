import logging
import secure
from contextlib import asynccontextmanager

from fastapi.responses import JSONResponse
import uvicorn
from configs.auth.dependencies import validate_token
from configs.configurations import config
from configs.logger import configure_logging
from fastapi import Depends, FastAPI
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException


logger = logging.getLogger(__name__)
token_auth_scheme = HTTPBearer()


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    logger.info("Bootstrapping the application.")
    yield


app = FastAPI()

csp = secure.ContentSecurityPolicy().default_src("'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache().no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

secure_headers = secure.Secure(
    csp=csp,
    hsts=hsts,
    referrer=referrer,
    cache=cache_value,
    xfo=x_frame_options,
)

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.framework.fastapi(response)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.CLIENT_ORIGIN_URL],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    message = str(exc.detail)

    return JSONResponse({"message": message}, status_code=exc.status_code)


@app.get("/api/public")
def public():
    result = {
        "status": "success",
        "msg": (
            "Hello from a public endpoint! You don't need to be "
            "authenticated to see this."
        ),
    }
    return result

@app.get("/api/private", dependencies=[Depends(validate_token)])
def protected():
    return {"text": "This is a protected message."}




if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
