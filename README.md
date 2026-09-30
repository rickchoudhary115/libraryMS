<div align="center">

# 📚 Library Management System

**A modern full-stack library management platform built with the MERN stack.**

Manage books, members, issue requests, returns, availability and library operations from one clean dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![GitHub repo size](https://img.shields.io/github/repo-size/rickchoudhary115/library_management?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/rickchoudhary115/library_management?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/rickchoudhary115/library_management?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rickchoudhary115/library_management?style=flat-square)

<br/>

<img src="screenshots/admin-dashboard.png" alt="Admin Dashboard" width="90%"/>

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Issue Workflow](#-issue-workflow)
- [Fine Calculation](#-fine-calculation)
- [Architecture](#-architecture)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Installation](#%EF%B8%8F-installation)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Overview

The **Library Management System** is a full-stack web application that simplifies running a digital library. It offers separate experiences for **members** and **administrators**: members discover books, request issues and track their borrowing, while admins manage the entire library operation.

### 🎯 What it solves

| Traditional problem | How this app helps |
| --- | --- |
| Manual book records | Centralized digital catalog |
| Difficult issue tracking | Request → approve → return workflow |
| No real-time availability | Live available / total copies |
| Manual member management | Member list with activity |
| Complicated fine calculation | Automatic fines on late returns |
| No admin overview | Dedicated admin dashboard |

---

## 📸 Screenshots

### 🔐 Login

<div align="center">
  <img src="screenshots/login.png" alt="Login page" width="380"/>
</div>

<br/>

### 👤 Member Dashboard

Library stats, active issues, pending requests and quick actions in one place.

<div align="center">
  <img src="screenshots/member-dashboard.png" alt="Member dashboard" width="90%"/>
</div>

<br/>

### 📚 Book Catalog

Search by title, author or ISBN and see live availability on every card.

<div align="center">
  <img src="screenshots/books.png" alt="Book catalog" width="90%"/>
</div>

<br/>

### 📖 Book Details & Issue Request

View full details and availability, then send an issue request to the administrator.

<div align="center">
  <img src="screenshots/book-details.png" alt="Book details modal" width="480"/>
</div>

<br/>

### 🛡️ Admin Control Center

Manage books, issues, members and library activity from a single hub.

<div align="center">
  <img src="screenshots/admin-dashboard.png" alt="Admin dashboard" width="90%"/>
</div>

<br/>

### 📊 Dashboard Overview (Admin view)

<div align="center">
  <img src="screenshots/dashboard-overview.png" alt="Dashboard overview" width="90%"/>
</div>

---

## 🚀 Features

### 👤 Member Features

**🔐 Authentication**
- User registration and secure login
- JWT-based authentication
- Protected routes and automatic session restoration
- Logout

**📚 Book Discovery**
- Browse the complete catalog
- Search by title, author or ISBN
- Detailed book view with availability
- Responsive book cards

**📖 Issue Requests**
- Request an available book
- See request status
- Track currently issued and returned books
- Monitor due dates and fines

**📊 Member Dashboard**
- Library statistics
- Active issues, pending requests, returned books
- Quick actions

### 🛡️ Admin Features

**📚 Book Management**
- Add, edit and delete books
- Manage total and available copies

**📋 Issue Management**
- View issue records and member requests
- Approve or reject requests
- Manually issue books
- Process returns and monitor fines

**👥 Member Management**
- View registered members and their issue activity

**📊 Admin Dashboard**
- Central control center with quick administrative actions

---

## 🔄 Issue Workflow

```text
┌───────────────┐
│    Member     │
└───────┬───────┘
        │ Request Book
        ▼
┌───────────────────┐
│     Requested     │
└─────────┬─────────┘
          ▼
    ┌─────────────┐
    │    Admin    │
    └──────┬──────┘
      ┌────┴─────┐
      ▼          ▼
  Approve      Reject
      │          │
      ▼          ▼
   Issued     Rejected
      │
      │ Return
      ▼
   Returned
```

| Status | Description |
| --- | --- |
| `requested` | Member has requested the book |
| `issued` | Admin approved the request |
| `returned` | Book has been returned |
| `rejected` | Admin rejected the request |

---

## 💰 Fine Calculation

Fines are calculated automatically by the backend when an issued book is returned after its due date.

```text
Due Date
   ├── Returned on time → Fine = ₹0
   └── Returned late    → Fine calculated
```

---

## 🧠 Architecture

```text
                ┌─────────────────────┐
                │       Browser       │
                │    React + Vite     │
                └──────────┬──────────┘
                           │ HTTP / REST API
                           ▼
                ┌─────────────────────┐
                │     Express API     │
                │       Node.js       │
                └──────────┬──────────┘
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
    Auth Service      Book Service      Issue Service
         └─────────────────┼─────────────────┘
                           ▼
                ┌─────────────────────┐
                │       MongoDB       │
                └─────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend**

| Technology | Purpose |
| --- | --- |
| React | UI development |
| Vite | Dev/build tooling |
| Tailwind CSS | Styling |
| React Router | Routing |
| Axios | API communication |
| Lucide React | Icons |

**Backend**

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express.js | REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```text
LIBRARY MANAGEMENT SYSTEM/
├── backend/
│   ├── controllers/   (auth, book, dashboard, issue)
│   ├── middleware/    (auth, role)
│   ├── models/        (Book, Issue, User)
│   ├── routes/        (auth, book, dashboard, issue)
│   ├── services/      (auth, book, dashboard, issue)
│   ├── utils/         (calculateFine.js)
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   (books, issues, common)
│   │   ├── context/      (AuthContext.jsx)
│   │   ├── pages/        (auth, admin, Dashboard, Books, Issues)
│   │   ├── utils/        (axios.js)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── screenshots/
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

<details>
<summary><strong>Authentication</strong></summary>

| Method | Endpoint | Access |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/me` | Authenticated |

</details>

<details>
<summary><strong>Books</strong></summary>

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/books` | Authenticated |
| `POST` | `/api/books` | Admin |
| `PUT` | `/api/books/:id` | Admin |
| `DELETE` | `/api/books/:id` | Admin |

</details>

<details>
<summary><strong>Issues</strong></summary>

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/issues` | Authenticated |
| `GET` | `/api/issues/members` | Admin |
| `POST` | `/api/issues/request` | Member |
| `POST` | `/api/issues` | Admin |
| `GET` | `/api/issues/requests` | Admin |
| `PUT` | `/api/issues/:id/approve` | Admin |
| `PUT` | `/api/issues/:id/reject` | Admin |
| `PUT` | `/api/issues/:id/return` | Admin |

</details>

<details>
<summary><strong>Dashboard</strong></summary>

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/dashboard` | Authenticated |

</details>

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/rickchoudhary115/library_management.git
cd library_management
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open `http://localhost:5173`

> ⚠️ Never commit your real `.env` files. Only `.env.example` files belong in the repository.

---

## 👑 Roles

| Role | Permissions |
| --- | --- |
| **Member** | Browse & search books, request books, view issues, track returns |
| **Admin** | Everything a member can do, plus add/update/delete books, approve/reject requests, manually issue books, process returns, view members |

---

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Protected frontend routes
- Environment variable configuration
- Server-side member identification for issue requests

---

## 📱 Responsive Design

Works across 💻 desktop, 🖥️ large screens, 📲 tablets and 📱 mobile devices.

---

## 🧪 Future Improvements

- [ ] Email notifications
- [ ] Book cover uploads
- [ ] Advanced analytics & admin charts
- [ ] Member profile page
- [ ] Password reset & email verification
- [ ] Pagination
- [ ] Advanced book filtering & categories
- [ ] Reading history
- [ ] Fine payment integration
- [ ] Docker & cloud deployment
- [ ] Automated testing

---

## 🚀 Deployment

| Layer | Options |
| --- | --- |
| Frontend | Vercel, Netlify |
| Backend | Render, Railway, AWS |
| Database | MongoDB Atlas |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is available for educational and development purposes.

---

## 👨‍💻 Developer

**Rick Choudhury** — Full-Stack Developer • AI/ML Developer

Built with ❤️ using the MERN stack.

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**📚 Learn More. Read More. Build More.**

</div>
