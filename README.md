# Full-Stack Task Management Application

A full-stack, responsive task management application built using the MERN stack (MongoDB, Express, React, Node.js). 

This application provides user authentication, task lifecycle management, priority configuration, and real-time search/filtering.

---

## Features

1. **User Authentication**
   - User Registration (Sign up)
   - User Login (Sign in) with secure password hashing (`bcryptjs`)
   - JWT-based authentication for securing api routes

2. **Task CRUD Operations**
   - Create new tasks with custom priorities (High, Medium, Low)
   - View your own tasks securely
   - Edit task titles inline
   - Delete tasks with immediate UI updates

3. **Status Management**
   - Mark tasks as `Todo`, `In Progress`, or `Done`
   - Complete tasks easily via the checkbox toggle

4. **Search and Filtering**
   - Real-time search of tasks by their title
   - Filter tasks by their status (All, Todo, In Progress, Done)

---

## Tech Stack

* **Frontend**: React, Vite, Vanilla CSS, Axios
* **Backend**: Node.js, Express
* **Database**: MongoDB (Mongoose Object Modeling)
* **Authentication**: JSON Web Tokens (JWT)

---

## Setup & Running Guide

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Configure Environment Variables
Create a file named `.env` in the root folder of the project (if it is not already there) and configure the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

*(A default sample connection string is pre-configured in the project for instant testing).*

### 3. Install Dependencies

In the root of the project directory, run:
```bash
npm install
```

In the `client` directory, run:
```bash
npm install --prefix client
```

### 4. Start the Application

You can start both the backend server and frontend client concurrently with a single command from the project root:
```bash
npm run dev
```

* **Frontend** will be running at: [http://localhost:5173/](http://localhost:5173/) (or next available port, e.g., 5174, 5175, 5176)
* **Backend API** will be running at: [http://localhost:5000/](http://localhost:5000/)
