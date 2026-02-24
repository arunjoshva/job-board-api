# Job Board API (Node.js + Express + MongoDB)

A fully functional RESTful Job Board API built using Node.js, Express, and MongoDB.  
This project includes authentication, job management, job applications, and secure route protection using JWT.

---

## Live API

https://job-board-api-ct5v.onrender.com

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- Render (Deployment)
- Postman (API Testing)

---

## Features

### Authentication
- User Registration
- User Login (JWT Token)
- Password Hashing (bcrypt)
- Protected Routes using Middleware

### Job Management (Full CRUD)
- Create Job (Protected)
- Get All Jobs (Public)
- Get Single Job (Public)
- Update Job (Owner Only)
- Delete Job (Owner Only)

### Application System
- Apply to Job (Protected)
- Prevent Duplicate Applications
- View My Applications
- Employer View Applications for Their Job

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

---

### Job Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job (Protected) |
| PATCH | `/api/jobs/:id` | Update job (Owner Only) |
| DELETE | `/api/jobs/:id` | Delete job (Owner Only) |

---

### Application Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/api/applications/:jobId` | Apply to job |
| GET | `/api/applications/my` | View my applications |
| GET | `/api/applications/job/:jobId` | Employer view applications |

---

## Authentication Usage

Protected routes require a JWT token in headers:


Authorization: Bearer YOUR_TOKEN


---

## Environment Variables

Create a `.env` file in root directory:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000


---

## 📦 Deployment

Backend deployed on Render  
MongoDB Database hosted on MongoDB Atlas  

---

## Learning Outcomes

- REST API architecture
- JWT authentication
- Middleware implementation
- MongoDB relationships
- Deployment to cloud
- Environment variable management
- Production debugging

--- 