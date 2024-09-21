from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class BaseConfig(BaseSettings):
    ENV_STATE: Optional[str] = None
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


class GlobalConfig(BaseConfig):
    DB_URL: Optional[str] = None


class DevConfig(GlobalConfig):
    DB_URL: str = "sqlite://dev.db"
    DB_FORCE_ROLL_BACK: bool = False

    model_config = SettingsConfigDict(env_prefix="DEV_")


class TestConfig(GlobalConfig):
    DB_URL: str = "sqlite://dev.db"
    DB_FORCE_ROLL_BACK: bool = False

    model_config = SettingsConfigDict(env_prefix="TEST_")


class ProdConfig(GlobalConfig):
    DB_URL: str = "sqlite://dev.db"
    DB_FORCE_ROLL_BACK: bool = False

    model_config = SettingsConfigDict(env_prefix="PROD_")


@lru_cache()
def get_config(env_state: str):
    """Instantiate config based on the environment."""
    configs = {"dev": DevConfig, "prod": ProdConfig, "test": TestConfig}
    return configs[env_state]()


config = get_config(BaseConfig().ENV_STATE)
