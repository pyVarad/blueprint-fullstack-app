import logging
from logging.config import dictConfig

from configs.configurations import DevConfig, config

handlers = ["default"]

def configure_logging():
    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "filters": {

            },
            "formatters": {
                "console": {
                    "class": "logging.Formatter",
                    "datefmt": "%Y-%m-%dT%H:%M:%S",
                    "format": "%(name)s:%(lineno)d - %(message)s"
                }
            },
            "handlers": {
                "default": {
                    "class": "rich.logging.RichHandler",
                    "level": "DEBUG",
                    "formatter": "console"
                },
            },
            "loggers": {
                "uvicorn": {
                    "handlers": ["default", "rotating_file"],
                    "level": "INFO",
                    "propagate": False
                },
                "aiosqlite": {
                    "handlers": ["default"],
                    "level": "WARN",
                    "propagate": False
                },
                "api": {
                    "handlers": handlers,
                    "level": "DEBUG" if isinstance(config, DevConfig) else "INFO",
                    "propagate": False,
                }
            },
        }
    )