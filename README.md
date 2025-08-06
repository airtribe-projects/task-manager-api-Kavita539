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
```
---

- Server will start at: http://localhost:3000

---

## 🔌 API Endpoints

### Base URL: http://localhost:3000

#### ✅ 1. Get All Tasks

```bash
GET /api/v1/tasks
```

##### Response:
```bash
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Bought grocery",
    "completed": false,
    "priority": "medium",
    "createdAt": 1234567
  },
]
```

#### ✅ 2. Get specific Task by ID

```bash
GET /api/v1/tasks/1
```

##### Response:
```bash
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Bought grocery",
    "completed": false,
    "priority": "medium"
    "createdAt": 1234567
  },
]
```

#### ✅ 3. Get specific Task by priority level

```bash
GET /api/v1/tasks/priority/medium
```

##### Response:
```bash
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Bought grocery",
    "completed": false,
    "priority": "medium"
    "createdAt": 1234567
  },
]
```

#### ✅ 4. Create a Task

```bash
POST /api/v1/tasks
```

##### Request:
```bash
  {
    "title": "Buy groceries new item",
    "description": "Bought grocery - done",
    "completed": true,
    "priority": "high"
  }
```

##### Response:
```bash
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Bought grocery",
    "completed": false,
    "priority": "medium",
    "createdAt": 1234567
  },
  {
    "id": 2,
    "title": "Buy groceries new item",
    "description": "Bought grocery - done",
    "completed": true,
    "priority": "high",
    "createdAt": 1234566
  },
]
```

#### ✅ 5. Update aa task by ID

```bash
PUT /api/v1/tasks/1
```

##### Request:
```bash
  {
    "id": 1,
    "title": "Buy groceries new item",
    "description": "Bought grocery - done",
    "completed": true,
    "priority": "high"
  }
```

##### Response:
```bash
[
  {
    "id": 1,
    "title": "Buy groceries new item",
    "description": "Bought grocery - done",
    "completed": true,
    "priority": "high",
    "createdAt": 1234567
  },
]
```

#### ✅ 6. Delete a task by ID 

```bash
DELETE /api/v1/tasks/1
```

##### Response:
```bash
[]
```
