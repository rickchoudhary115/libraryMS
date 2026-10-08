<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:4f46e5,100:9333ea&height=220&section=header&text=LibraryMS&fontSize=70&fontColor=ffffff&fontAlignY=38&desc=Library%20Management%20System&descSize=22&descAlignY=60&animation=fadeIn" width="100%" alt="LibraryMS banner"/>

<a href="https://github.com/rickchoudhary115/library_management">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1200&color=8B5CF6&center=true&vCenter=true&width=640&lines=Manage+books+%26+members+effortlessly;Request+%E2%86%92+Approve+%E2%86%92+Return+workflow;Automatic+fine+calculation;Built+with+the+MERN+stack" alt="Typing animation"/>
</a>

<br/>

<a href="https://library-management-frontend-6kef.onrender.com/">
  <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-8b5cf6?style=for-the-badge" alt="Live Demo"/>
</a>

<br/><br/>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

![Repo size](https://img.shields.io/github/repo-size/rickchoudhary115/library_management?style=flat-square&color=8b5cf6)
![Stars](https://img.shields.io/github/stars/rickchoudhary115/library_management?style=flat-square&color=8b5cf6)
![Forks](https://img.shields.io/github/forks/rickchoudhary115/library_management?style=flat-square&color=8b5cf6)
![Issues](https://img.shields.io/github/issues/rickchoudhary115/library_management?style=flat-square&color=8b5cf6)
![Last commit](https://img.shields.io/github/last-commit/rickchoudhary115/library_management?style=flat-square&color=8b5cf6)

### Manage books, members, issue requests, returns and availability from one clean dashboard.

[**Live Demo**](https://library-management-frontend-6kef.onrender.com/) •
[**Features**](#-features) •
[**Screenshots**](#-screenshots) •
[**Workflow**](#-issue-workflow) •
[**Quick Start**](#-quick-start) •
[**API**](#-api-reference) •
[**Roadmap**](#-roadmap)

<br/>

<img src="screenshots/admin-dashboard.png" alt="LibraryMS Admin Control Center" width="92%"/>

</div>

<br/>

## ✨ Overview

**LibraryMS** is a full-stack web application that replaces paper registers and spreadsheets with a modern digital library. It gives **members** a smooth way to discover and request books, and gives **administrators** a powerful control center to run the whole operation.

<table>
<tr>
<td width="50%" valign="top">

### 😩 Before

- Manual book records
- Hard-to-track issued books
- No real-time availability
- Manual member management
- Fines calculated by hand
- No central admin view

</td>
<td width="50%" valign="top">

### 🚀 With LibraryMS

- Centralized digital catalog
- Request → approve → return workflow
- Live available / total copies
- Member list with issue activity
- Automatic fine calculation
- One admin dashboard for everything

</td>
</tr>
</table>

---

## 🌐 Live Demo

🔗 **[library-management-frontend-6kef.onrender.com](https://library-management-frontend-6kef.onrender.com/)**

> [!NOTE]
> The app is hosted on Render's free tier, so the first load may take 30-60 seconds while the server wakes up.

---

## 📸 Screenshots

<div align="center">

<table>
<tr>
<td align="center" width="50%">
<b>🔐 Login</b><br/><br/>
<img src="screenshots/login.png" alt="Login" width="80%"/>
</td>
<td align="center" width="50%">
<b>📖 Book Details & Issue Request</b><br/><br/>
<img src="screenshots/book-details.png" alt="Book details" width="100%"/>
</td>
</tr>
</table>

<br/>

<b>👤 Member Dashboard</b><br/><br/>
<img src="screenshots/member-dashboard.png" alt="Member dashboard" width="92%"/>

<br/><br/>

<b>📚 Book Catalog with Live Availability</b><br/><br/>
<img src="screenshots/books.png" alt="Book catalog" width="92%"/>

<br/><br/>

<b>🛡️ Admin Control Center</b><br/><br/>
<img src="screenshots/admin-dashboard.png" alt="Admin dashboard" width="92%"/>

</div>

<details>
<summary><b>📊 See one more: dashboard overview</b></summary>
<br/>
<div align="center">
<img src="screenshots/dashboard-overview.png" alt="Dashboard overview" width="92%"/>
</div>
</details>

---

## 🚀 Features

<table>
<tr>
<td width="50%" valign="top">

### 👤 Members

🔐 **Authentication**
- Register & secure login (JWT)
- Protected routes
- Automatic session restoration

📚 **Book Discovery**
- Browse the full catalog
- Search by title, author or ISBN
- Detailed view with availability

📖 **Issue Requests**
- Request any available book
- Track request status
- See due dates and fines
- View returned books

📊 **Personal Dashboard**
- Active issues, pending requests, returns
- Quick actions

</td>
<td width="50%" valign="top">

### 🛡️ Administrators

📚 **Book Management**
- Add, edit and delete books
- Manage total & available copies

📋 **Issue Management**
- Review member requests
- Approve or reject with one click
- Manually issue books
- Process returns & monitor fines

👥 **Member Management**
- View registered members
- See member issue activity

📊 **Admin Hub**
- Central control center
- Quick administrative actions

</td>
</tr>
</table>

---

## 🔄 Issue Workflow

```mermaid
flowchart LR
    A([👤 Member]) -->|Requests book| B[Requested]
    B --> C{🛡️ Admin}
    C -->|Approve| D[Issued]
    C -->|Reject| E[Rejected]
    D -->|Return| F[Returned]
    F --> G{On time?}
    G -->|Yes| H[Fine ₹0]
    G -->|No| I[Fine calculated]

    style A fill:#4f46e5,color:#fff,stroke:none
    style C fill:#9333ea,color:#fff,stroke:none
    style D fill:#16a34a,color:#fff,stroke:none
    style E fill:#dc2626,color:#fff,stroke:none
    style F fill:#0ea5e9,color:#fff,stroke:none
```

| Status | Meaning |
| :--- | :--- |
| 🟡 `requested` | Member has requested the book |
| 🟢 `issued` | Admin approved the request |
| 🔵 `returned` | Book has been returned |
| 🔴 `rejected` | Admin rejected the request |

> 💰 **Fines** are calculated automatically by the backend (`utils/calculateFine.js`) when a book is returned after its due date.

---

## 🧠 Architecture

```mermaid
flowchart TB
    U[🌐 Browser<br/>React + Vite + Tailwind] -->|REST API · JWT| API[⚙️ Express API<br/>Node.js]
    API --> MW[🔒 Auth & Role Middleware]
    MW --> S1[Auth Service]
    MW --> S2[Book Service]
    MW --> S3[Issue Service]
    MW --> S4[Dashboard Service]
    S1 --> DB[(🍃 MongoDB)]
    S2 --> DB
    S3 --> DB
    S4 --> DB
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
| :---: | :--- |
| **Frontend** | React · Vite · Tailwind CSS · React Router · Axios · Lucide React |
| **Backend** | Node.js · Express.js · Mongoose · JWT · bcrypt |
| **Database** | MongoDB |

</div>

---

## 📁 Project Structure

<details>
<summary><b>Click to expand</b></summary>

```text
library_management/
├── backend/
│   ├── controllers/     auth · book · dashboard · issue
│   ├── middleware/      auth · role
│   ├── models/          Book · Issue · User
│   ├── routes/          auth · book · dashboard · issue
│   ├── services/        auth · book · dashboard · issue
│   ├── utils/           calculateFine.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  books · issues · common
│   │   ├── context/     AuthContext.jsx
│   │   ├── pages/       auth · admin · Dashboard · Books · Issues
│   │   ├── utils/       axios.js
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

</details>

---

## ⚡ Quick Start

**Prerequisites:** Node.js 18+, npm, and a MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas)).

### 1️⃣ Clone

```bash
git clone https://github.com/rickchoudhary115/library_management.git
cd library_management
```

### 2️⃣ Backend

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

➡️ Runs on **http://localhost:5000**

### 3️⃣ Frontend

Open a new terminal:

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

➡️ Open **http://localhost:5173**

> [!IMPORTANT]
> Never commit real `.env` files. Only `.env.example` files belong in the repository.

> [!TIP]
> New accounts are created as **members**. To get an admin, register a user and change its `role` to `admin` in the database.

---

## 🔌 API Reference

<details>
<summary><b>🔐 Authentication</b></summary>
<br/>

| Method | Endpoint | Access |
| :---: | :--- | :---: |
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/me` | Authenticated |

</details>

<details>
<summary><b>📚 Books</b></summary>
<br/>

| Method | Endpoint | Access |
| :---: | :--- | :---: |
| `GET` | `/api/books` | Authenticated |
| `POST` | `/api/books` | Admin |
| `PUT` | `/api/books/:id` | Admin |
| `DELETE` | `/api/books/:id` | Admin |

</details>

<details>
<summary><b>📋 Issues</b></summary>
<br/>

| Method | Endpoint | Access |
| :---: | :--- | :---: |
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
<summary><b>📊 Dashboard</b></summary>
<br/>

| Method | Endpoint | Access |
| :---: | :--- | :---: |
| `GET` | `/api/dashboard` | Authenticated |

</details>

---

## 👑 Roles & Permissions

| Capability | 👤 Member | 🛡️ Admin |
| :--- | :---: | :---: |
| Browse & search books | ✅ | ✅ |
| Request a book | ✅ | ✅ |
| View own issues & returns | ✅ | ✅ |
| Add / edit / delete books | ❌ | ✅ |
| Approve / reject requests | ❌ | ✅ |
| Manually issue books | ❌ | ✅ |
| Process returns | ❌ | ✅ |
| View members | ❌ | ✅ |

---

## 🔒 Security

- 🔑 JWT authentication
- 🧂 Password hashing with bcrypt
- 🛑 Protected API routes
- 👮 Role-based authorization
- 🚧 Protected frontend routes
- 🙈 Secrets kept in environment variables
- 🪪 Member identity taken from the token on the server, not from the request body

---

## 🗺️ Roadmap

- [x] JWT authentication & role-based access
- [x] Book catalog with search
- [x] Request-based issue workflow
- [x] Automatic fine calculation
- [x] Member & admin dashboards
- [ ] Email notifications
- [ ] Book cover uploads
- [ ] Analytics & admin charts
- [ ] Member profile page
- [ ] Password reset & email verification
- [ ] Pagination & advanced filtering
- [ ] Book categories & reading history
- [ ] Fine payment integration
- [ ] Docker & cloud deployment
- [ ] Automated tests

---

## 🤝 Contributing

Contributions are welcome!

1. 🍴 Fork the repository
2. 🌿 Create a branch: `git checkout -b feature/your-feature`
3. 💾 Commit: `git commit -m "feat: add your feature"`
4. 🚀 Push: `git push origin feature/your-feature`
5. 🔁 Open a Pull Request

---

## 📄 License

This project is available for educational and development purposes.

---

<div align="center">

## 👨‍💻 Developer

**Anirban Choudhury**
Full-Stack Developer • AI/ML Developer

[![GitHub](https://img.shields.io/badge/GitHub-rickchoudhary115-181717?style=for-the-badge&logo=github)](https://github.com/rickchoudhary115)

### ⭐ If you found this project useful, please give it a star!

**📚 Learn More. Read More. Build More.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:9333ea,50:4f46e5,100:0f0c29&height=120&section=footer" width="100%" alt="footer"/>

</div>
