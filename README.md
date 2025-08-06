# 📝 Task Manager API

A simple Task Manager REST API built with **Node.js**, **Express**. This API allows users to manage tasks with functionality to create, read, update, and delete tasks.

---

## 🚀 Features

- Get all tasks
- Get a specific task by ID 
- Get specific task by priority level
- Add new tasks
- Update task by ID (title, completed status, priority)
- Delete a task by ID

---

## 📦 Tech Stack

- Node.js
- Express.js

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/airtribe-projects/task-manager-api-Kavita539.git
cd task-manager-api-Kavita539
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node index.js
- Server will start at: http://localhost:3000
```

---

## 🔌 API Endpoints

### ✅ 1. Get All Tasks
GET /api/tasks

Response:
[
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "priority": "medium"
  },
  ...
]
