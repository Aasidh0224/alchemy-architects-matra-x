# MATRA-X — Alchemy Architects — SIH26099

A deployment-ready demo of the MATRA-X material harmonization prototype.

## One-click Windows run
Double-click `start_matrax_windows.bat`.
It creates `.venv`, installs dependencies, starts the combined FastAPI + frontend server, and opens the UI.

## macOS / Linux
```bash
./start_matrax.sh
```
Then open `http://127.0.0.1:8765/`.

## API
The same server exposes:
- `GET /api/health`
- `POST /api/match`
- `POST /api/ingest`
- `POST /api/harmonize`
- `GET /api/providers`
- `GET /docs`

## Deploy to Render
1. Push this folder to a GitHub repository.
2. In Render, create a Web Service from the repository.
3. Render can use the included `render.yaml`, or set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. The app will be available at the Render `onrender.com` URL.

## Deploy to Hugging Face Spaces
Use a Docker Space and upload this folder. The included Dockerfile listens on port 7860, which is compatible with Docker Spaces.

## Important
- The bundled dataset is synthetic demonstration data.
- No API keys are stored in the bundle.
- The current UI has a deterministic demo reasoning path; frontier-LLM adapters in `matra_app/api/llm_router.py` are optional and require provider credentials.
- Replace illustrative metrics with measured benchmark results before using them in an SIH submission.
