9# OZOCO — Citizen Services Platform

OZOCO is a digital citizen services platform designed to make
accessing citizen services simpler, faster, and more user-friendly.

This repository contains the frontend application of the OZOCO platform.
The frontend is being developed with a focus on a clean, responsive,
accessible, and citizen-friendly user experience.

---

## 📌 Project Overview

The goal of OZOCO is to provide citizens with a single digital platform
where they can access different citizen services, submit requests, and
track the progress of their applications.

The frontend provides the user interface and navigation required for
these services and is being developed with future backend integration
in mind.

---

## 🔄 Application Flow

The planned user journey of the application is:

```text
                    Homepage
                       ↓
                Login / Register
                       ↓
                Citizen Dashboard
                       ↓
                Select a Service
                       ↓
                Submit a Request
                       ↓
                Track Request
                       ↓
              Service Resolution
```

---

## 🔐 Authentication Flow

The authentication pages follow this flow:

```text
                         Login
                           │
             ┌─────────────┴─────────────┐
             ↓                           ↓
      Create Account              Forgot Password
             ↓                           ↓
         Register                 Password Recovery
             │                           │
             └─────────────┬─────────────┘
                           ↓
                          Login
```

### Authentication Pages

- Login
- Register
- Forgot Password

Users can navigate between the authentication pages through the
available links and buttons.

---

## 📂 Project Structure

```text
citizen-app-frontend/
│
├── public/
│   └── JanaMaan_logo.png
│
├── src/
│   │
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Folder Description

| Folder / File | Purpose |
|---|---|
| `public/` | Static assets such as logos and images |
| `components/` | Reusable UI components |
| `pages/` | Application pages |
| `App.jsx` | Main application routing and page structure |
| `main.jsx` | React application entry point |
| `README.md` | Project documentation |

---

## 🛠️ Tech Stack

- **React.js** — Frontend development
- **JavaScript** — Application logic
- **Tailwind CSS** — Styling and responsive UI
- **React Router** — Client-side navigation
- **Vite** — Development and build tool
- **Git** — Version control
- **GitHub** — Repository and collaboration

---

## ✨ Current Features

### Authentication UI

- Login page
- Registration page
- Forgot Password page
- Login ↔ Register navigation
- Login ↔ Forgot Password navigation
- Responsive authentication layouts

### Common UI

- OZOCO branding
- Responsive navigation bar
- Consistent design system
- Responsive layouts
- Reusable React components

---

## 📊 Development Status

### Completed

- [x] React + Vite project setup
- [x] Tailwind CSS setup
- [x] Login page UI
- [x] Register page UI
- [x] Forgot Password page UI
- [x] Authentication page navigation
- [x] OZOCO logo integration
- [x] Navbar component

### In Progress

- [ ] Homepage
- [ ] Citizen services section
- [ ] Service cards
- [ ] Request submission UI
- [ ] Request tracking UI
- [ ] Final UI/UX improvements

### Planned

- [ ] Backend API integration
- [ ] User authentication
- [ ] Database integration
- [ ] Citizen request submission
- [ ] Application tracking
- [ ] Notifications
- [ ] Service status updates

---

## 🚀 Installation & Setup



### 1. Navigate to the project directory

```bash
cd citizen-app-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will then run on the local development server
provided by Vite.

---

## 🔮 Future Scope

The frontend is being developed with future backend integration in mind.

Future functionality will include:

- Secure user authentication
- Citizen service APIs
- Request submission
- Application tracking
- Service status updates
- Notifications
- Citizen dashboard
- Personalized services

---

## 👨‍💻 Author

**Rachit Verma**

Frontend Development Intern

---

## 📌 Project Status

🚧 **Under Active Development**

The OZOCO frontend is currently under development. New pages,
components, citizen services, and backend integrations will be
added progressively.