from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from matra_app.api.main import app as api_app

BASE = Path(__file__).resolve().parent
FRONTEND = BASE / "matra_app"

app = api_app
app.mount("/", StaticFiles(directory=str(FRONTEND), html=True), name="frontend")
