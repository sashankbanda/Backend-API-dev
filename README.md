# Task Management API

A RESTful backend API for managing Employees and Tasks, built with Node.js, Express, and PostgreSQL using Prisma ORM.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Assumptions](#assumptions)
- [Testing with Postman](#testing-with-postman)

## ✨ Features

- **Employee Management**: Create, read, update, and delete employees
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status or employee ID
- **Task Assignment**: Link tasks to employees (nullable foreign key)
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Standardized error responses
- **Logging**: Request logging with Morgan
- **JWT Authentication**: Optional JWT authentication structure (bonus feature)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: express-validator
- **Logging**: Morgan
- **Authentication**: JWT (jsonwebtoken) - Optional

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/task_management?schema=public"

# Server
PORT=3000
NODE_ENV=development

# JWT (Optional - for bonus authentication)
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
```

**Note**: Replace `user`, `password`, and `localhost:5432` with your PostgreSQL credentials.

### 4. Create Database

Create a PostgreSQL database named `task_management`:

```sql
CREATE DATABASE task_management;
```

Or using psql:

```bash
psql -U postgres
CREATE DATABASE task_management;
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate Prisma Client

### 6. Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run prisma:seed
```

### 7. Start the Server

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## 📊 Database Schema

### Employee Model

| Field     | Type    | Constraints           |
|-----------|---------|-----------------------|
| id        | Int     | Primary Key, Auto-increment |
| name      | String  | Required              |
| role      | String  | Required              |
| email     | String  | Required, Unique      |
| createdAt | DateTime| Auto-generated        |
| updatedAt | DateTime| Auto-updated          |

### Task Model

| Field       | Type      | Constraints                    |
|-------------|-----------|--------------------------------|
| id          | Int       | Primary Key, Auto-increment    |
| title       | String    | Required                       |
| description | String?   | Optional                       |
| status      | Enum      | PENDING, IN_PROGRESS, COMPLETED |
| employeeId  | Int?      | Foreign Key (nullable)         |
| createdAt   | DateTime  | Auto-generated                 |
| updatedAt   | DateTime  | Auto-updated                   |

### Relationships

- Employee has many Tasks (one-to-many)
- Task belongs to Employee (many-to-one, optional)
- When an Employee is deleted, their tasks' `employeeId` is set to `null` (onDelete: SetNull)

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Employees Endpoints

#### GET /employees

Get all employees with their associated tasks.

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "Software Developer",
      "email": "john.doe@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "tasks": [
        {
          "id": 1,
          "title": "Implement user authentication",
          "status": "IN_PROGRESS"
        }
      ]
    }
  ],
  "count": 1
}
```

#### POST /employees

Create a new employee.

**Request Body**:
```json
{
  "name": "Jane Smith",
  "role": "Project Manager",
  "email": "jane.smith@example.com"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "role": "Project Manager",
    "email": "jane.smith@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /employees/:id

Update an existing employee.

**Request Body** (all fields optional):
```json
{
  "name": "Jane Doe",
  "role": "Senior Project Manager",
  "email": "jane.doe@example.com"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "role": "Senior Project Manager",
    "email": "jane.doe@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

#### DELETE /employees/:id

Delete an employee.

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

### Tasks Endpoints

#### GET /tasks

Get all tasks with optional filtering.

**Query Parameters**:
- `status` (optional): Filter by status (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
- `employeeId` (optional): Filter by employee ID

**Examples**:
- `GET /tasks` - Get all tasks
- `GET /tasks?status=PENDING` - Get all pending tasks
- `GET /tasks?employeeId=1` - Get all tasks assigned to employee 1
- `GET /tasks?status=IN_PROGRESS&employeeId=1` - Get in-progress tasks for employee 1

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Implement user authentication",
      "description": "Add JWT-based authentication to the API",
      "status": "IN_PROGRESS",
      "employeeId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "employee": {
        "id": 1,
        "name": "John Doe",
        "role": "Software Developer",
        "email": "john.doe@example.com"
      }
    }
  ],
  "count": 1,
  "filters": {
    "status": "IN_PROGRESS"
  }
}
```

#### GET /tasks/:id

Get a specific task by ID.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication to the API",
    "status": "IN_PROGRESS",
    "employeeId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "employee": {
      "id": 1,
      "name": "John Doe",
      "role": "Software Developer",
      "email": "john.doe@example.com"
    }
  }
}
```

#### POST /tasks

Create a new task.

**Request Body**:
```json
{
  "title": "Write API documentation",
  "description": "Document all endpoints with examples",
  "status": "PENDING",
  "employeeId": 1
}
```

**Note**: `description`, `status`, and `employeeId` are optional. Default status is `PENDING`.

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 3,
    "title": "Write API documentation",
    "description": "Document all endpoints with examples",
    "status": "PENDING",
    "employeeId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "employee": {
      "id": 1,
      "name": "John Doe",
      "role": "Software Developer",
      "email": "john.doe@example.com"
    }
  }
}
```

#### PUT /tasks/:id

Update an existing task.

**Request Body** (all fields optional):
```json
{
  "title": "Write comprehensive API documentation",
  "description": "Document all endpoints with examples and error cases",
  "status": "IN_PROGRESS",
  "employeeId": 2
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 3,
    "title": "Write comprehensive API documentation",
    "description": "Document all endpoints with examples and error cases",
    "status": "IN_PROGRESS",
    "employeeId": 2,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z",
    "employee": {
      "id": 2,
      "name": "Jane Smith",
      "role": "Project Manager",
      "email": "jane.smith@example.com"
    }
  }
}
```

#### DELETE /tasks/:id

Delete a task.

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Authentication Endpoints (Bonus)

#### POST /auth/login

Login and receive a JWT token.

**Request Body**:
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "admin",
      "userId": 1
    }
  }
}
```

**Note**: To enable JWT authentication for task creation/update/delete, uncomment the `authenticateToken` middleware in `src/routes/taskRoutes.js`.

## 🔐 Authentication

JWT authentication is implemented but **disabled by default** (as per requirements - viewing tasks is public). To enable authentication for task creation/update/delete:

1. Uncomment the `authenticateToken` middleware in `src/routes/taskRoutes.js`
2. Include the JWT token in the Authorization header:
   ```
   Authorization: Bearer <your-token>
   ```

## ⚠️ Error Handling

All errors follow a standardized format:

```json
{
  "success": false,
  "message": "Meaningful error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, duplicate entries)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Responses

**Validation Error** (400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Not Found** (404):
```json
{
  "success": false,
  "message": "Employee not found"
}
```

**Duplicate Entry** (400):
```json
{
  "success": false,
  "message": "Employee with this email already exists"
}
```

## 📝 Assumptions

1. **Email Uniqueness**: Employee emails must be unique across the system.
2. **Task Status**: Only three statuses are allowed: `PENDING`, `IN_PROGRESS`, `COMPLETED`.
3. **Cascade Delete**: When an employee is deleted, their tasks remain but are unassigned (employeeId set to null).
4. **Optional Task Assignment**: Tasks can exist without being assigned to an employee (employeeId is nullable).
5. **Default Task Status**: New tasks default to `PENDING` if not specified.
6. **JWT Authentication**: Disabled by default. Viewing tasks is public; creating/updating/deleting can be protected by uncommenting middleware.
7. **Environment**: Development environment is assumed. Production should have proper security measures.

## 🧪 Testing with Postman

A Postman collection is included in the repository (`postman_collection.json`). To use it:

1. Open Postman
2. Click **Import** → **File**
3. Select `postman_collection.json`
4. Update the collection variable `baseUrl` if your server runs on a different port

The collection includes:
- All employee endpoints
- All task endpoints with various filter examples
- Authentication endpoint
- Example requests with sample data

## 📁 Project Structure

```
task-management-api/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                 # Seed data script
├── src/
│   ├── config/
│   │   └── database.js         # Prisma client configuration
│   ├── controllers/
│   │   ├── employeeController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   ├── errorHandler.js     # Error handling
│   │   └── validation.js       # Input validation
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   ├── taskRoutes.js
│   │   └── authRoutes.js
│   ├── services/
│   │   ├── employeeService.js
│   │   └── taskService.js
│   └── server.js               # Express app entry point
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── postman_collection.json     # Postman collection
└── README.md
```

## 🚦 Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database with sample data
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## 📄 License

ISC

---

**Built for ProU - Intern Software Development - Backend Developer Assignment**

