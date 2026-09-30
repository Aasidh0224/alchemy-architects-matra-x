#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/app/api"
python -m uvicorn main:app --host 0.0.0.0 --port 8000
