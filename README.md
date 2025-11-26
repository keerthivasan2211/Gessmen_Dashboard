# Project Management Dashboard (MERN)

## Overview
Simple MERN app to manage Projects and Employees.

## Backend
Folder: backend
- Port: 5000
- REST endpoints:
  - GET /api/projects
  - POST /api/projects
  - PUT /api/projects/:id
  - DELETE /api/projects/:id
  - GET /api/employees
  - POST /api/employees

### Run backend
1. cd backend
2. copy `.env` (example provided) and set MONGODB_URL
3. npm install
4. npm run dev

## Frontend
Folder: frontend
- Run dev server on port 3000 (recommended)
  - Linux/Mac: `PORT=3000 npm run dev`
  - Windows (cmd): `set PORT=3000 && npm run dev`

### Run frontend
1. cd frontend
2. npm install
3. start with port 3000 as above

## Notes
- Use MongoDB local or Atlas (set MONGODB_URL)
- Frontend expects backend at `http://localhost:5000/api`
- Add seed data by POST to `/api/employees` then create projects

## Sample cURL
Add employee:
