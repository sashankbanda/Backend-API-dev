# Task Management API

A backend API for managing **Employees** and **Tasks**, built using **Node.js**, **Express**, **PostgreSQL**, **Prisma ORM**, and **Swagger** for documentation.

This project was built for the **ProU – Intern Software Development (Backend Developer) Assignment**.

---

## 📌 Features

*   Employee CRUD (Create, Read, Update, Delete)
*   Task CRUD (Create, Read, Update, Delete)
*   Filter tasks by status or employeeId
*   Assign tasks to employees
*   Prisma ORM integration
*   Input validation using express-validator
*   Centralized error handling
*   Swagger API documentation
*   Optional JWT authentication (bonus)
*   Database seeding for demo

---

## 🧩 System Architecture (Mermaid Diagram)

```mermaid
flowchart TD
    Client[Browser / Swagger UI] -->|HTTP Requests| Server[Express.js Server]
    Server -->|Queries| Prisma[Prisma ORM]
    Prisma -->|SQL| Postgres[(PostgreSQL Database)]

    subgraph API Routes
        ER[Employee Routes]
        TR[Task Routes]
        AR[Auth Routes]
    end

    Server --> ER
    Server --> TR
    Server --> AR
```

---

## 🗂 Project Structure

```
task-management-api/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── postman_collection.json
└── README.md
```

---

## ⚙️ Tech Stack

*   Node.js
*   Express.js
*   PostgreSQL
*   Prisma ORM
*   Swagger (OpenAPI 3.0)
*   JSON Web Token (JWT)
*   express-validator
*   Morgan logger

---

## 📥 Prerequisites

Make sure you have installed:

*   Node.js (v14+)
*   PostgreSQL (v12+)
*   npm
*   Git (optional)

---

## 🚀 How to Run Locally

### 1. Clone the Project

```bash
git clone <repository-url>
cd task-management-api
```

### 2. Install Packages

```bash
npm install
```

### 3. Create .env File

Create a `.env` file in the root folder of the project with the following content:

```ini
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_management?schema=public"
PORT=3000
NODE_ENV=development
JWT_SECRET=anythingyouwant
JWT_EXPIRES_IN=24h
```

### 4. Create PostgreSQL Database

Open your PostgreSQL client (e.g., `psql`) and create the database:

```bash
psql -U postgres
CREATE DATABASE task_management;
\q
```

### 5. Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

### 6. Seed Database (optional but recommended)

```bash
npm run prisma:seed
```

### 7. Start Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The backend will run on: `http://localhost:3000`

Swagger Docs will be available at: `http://localhost:3000/docs`

---

## 📚 API Documentation (Swagger)

Swagger UI automatically loads when the server starts.

👉 Visit: `http://localhost:3000/docs`

You can execute API calls for:

*   GET all employees
*   POST new employee
*   PUT update employee
*   DELETE employee
*   GET tasks (with filters)
*   POST/PUT/DELETE tasks

---
## 📖 API Documentation
For a detailed breakdown of all routes and specifications, please refer to:
👉 [**ENDPOINTS.md**](./ENDPOINTS.md)

---
### 👤 Employee Management
<div align="center">

**Create Employee (POST)**
<br>
<img src="screenshots/02%20employee_post_tryitout.png" height="300" alt="Try It Out" />
<img src="screenshots/03%20employee_post.png" height="300" alt="Request Body" />
<img src="screenshots/04%20employee_post.png" height="300" alt="Response" />

<br><br>

**Get Employees (GET)**
<br>
<img src="screenshots/05%20employee_get.png" height="300" alt="Get All List" />
<img src="screenshots/06%20employee_get_by_id.png" height="300" alt="Get By ID" />

<br><br>

**Update Employee (PUT)**
<br>
<img src="screenshots/07%20employee_put.png" height="300" alt="Update Input" />
<img src="screenshots/08%20employee_put_update.png" height="300" alt="Update Result" />

<br><br>

**Delete Employee (DELETE)**
<br>
<img src="screenshots/09%20employee_delete.png" height="300" alt="Delete Action" />

</div>

### 📝 Task Management
<div align="center">

**Create Task (POST)**
<br>
<img src="screenshots/10%20task_post.png" height="300" alt="Task Request" />
<img src="screenshots/11%20task_post.png" height="300" alt="Task Response" />

<br><br>

**Get Tasks (GET)**
<br>
<img src="screenshots/12%20task_get.png" height="300" alt="Task Filters" />
<img src="screenshots/13%20task_get.png" height="300" alt="Task List Results" />

<br><br>

**Update Task (PUT)**
<br>
<img src="screenshots/14%20task_put.png" height="300" alt="Update Input" />
<img src="screenshots/15%20task_put.png" height="300" alt="Update Result" />

</div>

### Prisma
<div align="center">

**Prisma Studio**
<br>
<img src="screenshots/16%20Prisma%20Studio.png" alt="Prisma Studio UI" />

</div>

---

## 📦 Sample Payloads

### Create Employee

```json
{
  "name": "Deepak",
  "role": "22BCE1622",
  "email": "venkatadeepak77@gmail.com"
}
```

### Create Task

```json
{
  "title": "Prepare presentation",
  "description": "Slides for Monday meeting",
  "status": "PENDING",
  "employeeId": 1
}
```

---

## 🔐 Authentication (Optional)

To enable JWT authentication:

1.  Uncomment the `authenticateToken` middleware in: `src/routes/taskRoutes.js`
2.  Log in using the endpoint: `POST /api/auth/login` to obtain a token.
3.  Add the token to your request headers as: `Authorization: Bearer <token>`

---

## 🛠 Scripts

*   `npm run dev` : Start development server with nodemon.
*   `npm start` : Start production server.
*   `npm run prisma:migrate` : Run Prisma migrations.
*   `npm run prisma:seed` : Seed the database with sample data.
*   `npm run prisma:generate` : Generate Prisma client.
*   `npm run prisma:studio` : Open Prisma Studio for database introspection.

---

## 👨‍💻 Author

Developed for ProU Internship Backend Developer Assignment.