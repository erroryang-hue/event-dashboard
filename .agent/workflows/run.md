---
description: How to run the Event Manager project (Backend & Frontend)
---

To run the full-stack Event Manager application, follow these steps:

### 1. Prerequisites
- Ensure you have **PostgreSQL** running on your system.
- Create a database named `eventdb`.
- Update the credentials in `backend/.env` if they differ from the defaults.

### 2. Run the Backend
Open a new terminal and run:
```bash
cd backend
npm install
npm start
```
> [!NOTE]
> The server will start on [http://localhost:5000](http://localhost:5000).

### 3. Run the Frontend
Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at [http://localhost:3000](http://localhost:3000).

// turbo-all
### Quick Start
If your database is ready, simply run:
1. `npm start` in the `backend` folder.
2. `npm run dev` in the `frontend` folder.
