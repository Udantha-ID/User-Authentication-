# 🔐 JWT Authentication with Spring Boot & React

This project demonstrates a full-stack user authentication system built using **Spring Boot** for the backend and **React** for the frontend. It features secure **JWT-based login and registration**, password hashing with **BCrypt**,
and token-based route protection.

---

## 🚀 Features

- User registration with secure password encryption (BCrypt)
- Login and token-based authentication (JWT)
- Stateless API with Spring Security
- React frontend with Axios for HTTP requests
- Token storage in browser `localStorage`
- Automatic JWT header injection via Axios interceptors
- Protected routes (backend + frontend)

---

## 🛠️ Tech Stack

**Backend (Spring Boot):**
- Spring Web
- Spring Security
- Spring Data JPA
- JWT (Java JSON Web Token)
- MySQL / H2 (configurable)
- BCrypt Password Encoder

**Frontend (React):**
- React.js
- Axios
- React Router (for protected routes)
- localStorage (for token management)

---
---

## 📦 Getting Started

### ✅ Prerequisites
- Java 17+
- Node.js & npm
- MySQL or H2 (configurable)

### 🔧 Backend Setup
```bash
cd backend
./mvnw spring-boot:run

### 🔧 Frontend Setup
```bash
cd frontend
npm install
npm start
