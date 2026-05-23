@echo off
echo Starting UniInsight Dashboard Frontend and Backend...

:: Start the FastAPI backend in a new command window
start "UniInsight Backend" cmd /k "cd python_ai && pip install -r requirements.txt && python -m uvicorn app.main:app --reload"

:: Start the Vite frontend in a new command window
start "UniInsight Frontend" cmd /k "npm install && npm run dev"

echo Both servers are starting in separate windows.
pause
