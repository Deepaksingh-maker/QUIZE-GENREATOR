#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

print_step() {
  echo "\n==> $1"
}

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install Node.js 18+ and retry."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Install npm and retry."
  exit 1
fi

print_step "Node version"
node -v

print_step "Ensuring backend .env exists"
if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
  echo "Created backend/.env from .env.example"
  echo "Please set MONGODB_URI, JWT_SECRET, and OPENAI_API_KEY in backend/.env"
fi

print_step "Ensuring frontend .env exists"
if [[ ! -f "$FRONTEND_DIR/.env" ]]; then
  cp "$FRONTEND_DIR/.env.example" "$FRONTEND_DIR/.env"
  echo "Created frontend/.env from .env.example"
fi

print_step "Installing backend dependencies"
( cd "$BACKEND_DIR" && npm install )

print_step "Installing frontend dependencies"
( cd "$FRONTEND_DIR" && npm install )

print_step "Starting backend on http://localhost:5000"
( cd "$BACKEND_DIR" && npm run dev ) &
BACKEND_PID=$!

cleanup() {
  echo "\nStopping services..."
  kill "$BACKEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

print_step "Starting frontend on http://localhost:5173"
( cd "$FRONTEND_DIR" && npm run dev )
