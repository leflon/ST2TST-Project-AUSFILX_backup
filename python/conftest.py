import pytest
import dotenv
import os


@pytest.fixture(autouse=True, scope="session")
def setup_env():
    loaded = dotenv.load_dotenv()
    if not loaded:
        pytest.fail(".env file could not be loaded")


@pytest.fixture(scope="session")
def base_url(setup_env):
    group = os.environ["GROUP"]
    letter = os.environ["LETTER"]
    return f"https://{letter}.{group}.hr.dmerej.info"


@pytest.fixture
def database_url():
    group = os.environ["GROUP"]
    letter = os.environ["LETTER"]
    user = f"{group}-{letter}"
    password = user
    database = user
    return f"postgresql://{user}:{password}@hr.dmerej.info:5432/{database}"
