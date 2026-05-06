# CRUD React Frontend

A lightweight React frontend for the Node.js + Express + PostgreSQL CRUD API.

## Description

This frontend connects to the backend API and provides a product management interface for:

- Listing products
- Creating new products
- Editing existing products
- Deleting products

## Setup

1. Open a terminal in `frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the URL shown in the terminal (usually `http://127.0.0.1:5173`).

## Backend Requirements

The frontend expects the backend API to be available at `/api`.
The backend server should be running from `backend/` with:

```bash
cd backend
npm install
npm run dev
```

## Notes

- Vite is configured to proxy `/api` requests to the backend.
- If the backend port changes, update `frontend/vite.config.js` accordingly.
