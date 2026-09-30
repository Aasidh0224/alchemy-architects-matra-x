@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  set PY=py
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python 3 is required. Install it from https://www.python.org/downloads/
    pause
    exit /b 1
  )
  set PY=python
)

if not exist ".venv\Scripts\python.exe" (
  echo [1/3] Creating local virtual environment...
  %PY% -m venv .venv
)

echo [2/3] Installing required packages...
.venv\Scripts\python.exe -m pip install --upgrade pip >nul
.venv\Scripts\python.exe -m pip install -r requirements.txt

echo [3/3] Starting MATRA-X...
start "MATRA-X Server" cmd /k ".venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8765"
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:8765/

echo.
echo MATRA-X is running at http://127.0.0.1:8765/
echo Close the server window to stop it.
pause
endlocal
