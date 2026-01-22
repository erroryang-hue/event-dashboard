# Event Management System

A complete Event Management System with a React frontend and Node.js backend.

## Project Structure

- **backend/**: Node.js/Express server API
- **frontend/**: React/Vite application
- **database/**: SQL migration and seed files

## Quick Start (Docker)

The easiest way to run the project is using Docker Compose.

1. Ensure Docker and Docker Compose are installed.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. The services will be available at:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (or compatible SQL database)

### Backend Setup
1. Navigate to `backend` directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file based on the example (already created) and update DB credentials.
4. Run the server:
   \`\`\`bash
   npm start
   \`\`\`

### Frontend Setup
1. Navigate to `frontend` directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Database Setup
1. Ensure your PostgreSQL server is running.
2. Create a database named `event_manager`.
3. Run the SQL scripts in `database/migrations` to set up tables.
4. Run the SQL scripts in `database/seeds` to populate sample data.

## Features
- Dashboard with key metrics
- Registration management
- Event search with optimized DSA (Trie/HashMap)
- Analytics visualization
