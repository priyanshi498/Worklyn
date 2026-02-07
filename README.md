# Worklyn 

**Worklyn** is a modern full-stack project management tool designed to help teams collaborate, manage tasks, and track project progress efficiently.

##  Features
-  User authentication using JWT
-  Create and manage projects
-  Task creation, assignment & status tracking
-  Comments and collaboration inside tasks
-  Project member management
-  Clean and responsive UI

##  Tech Stack

### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

##  Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=worklyn
JWT_SECRET=your_jwt_secret
