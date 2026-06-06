# Taskify — Advanced React & Express Full-Stack Application

An industry-ready, production-grade boilerplate application built with a React & Vite frontend, coupled with a modular Express & MongoDB (Mongoose) REST API backend. This project demonstrates high-quality React patterns, global state management, functional protected routing, clean MVC backend architecture, and robust database validation.

---

## 🚀 Key Features

### Frontend (React & Vite)
1. **Global Auth Context**: Utilizes React Context API (`AuthContext`) to cleanly propagate login, logout, and user details application-wide.
2. **Functional Route Protection**: Custom `<ProtectedRoute />` preserves the targeted route during unauthorized requests and redirects the user dynamically to the `/login` route.
3. **Animated Interactions**: Native CSS keyframe animations and JS state-delays trigger on element changes:
   - Deleting a To-Do item (yielding a smooth slide-out and height-collapse).
   - Toggling the dialog Modal (providing a smooth fade-in and scale-drop).
4. **Clean Component Architecture**: Fully decoupled presentational inputs, navbar, cards, and modals.
5. **Real-time API Service Layer**: Fully integrated frontend `api.js` utilizing `fetch()` to sync directly with the live database. Features an elegant client-side mapper to map Mongoose standard `_id` and `title` keys to state-expected `id` and `text` properties without modifying legacy UI components.

### Backend (Node.js, Express & Mongoose)
1. **Robust MVC Structure**: Organized into standard Database configuration, Model, Controller, and Route directories.
2. **Mongoose Database Schemas**: 
   - **User**: Features trimmed inputs, unique email indexing, lowercasing, and regex format validation.
   - **Todo**: Standardized database schemas with `title`, `description`, `completed`, and standard relation references linking it directly to a User.
3. **Strict Validation Control**: Prevents empty task additions by applying robust controllers that filter out empty or whitespace-only inputs at the API gateway layer before hit.
4. **Reliable Windows & Node v18 Support**:
   - **Custom Port Binding**: Runs on port `5050` to bypass local Windows port conflicts (like SSDP/system helper services on default port `5000`).
   - **Node v18 Polyfills**: Implements a global `crypto` injection at the server's entry point to fully support Mongoose/MongoDB ObjectId generations under Node.js v18.x.
5. **Traceability Logging**: Features incoming request logging showing request methods, resources, and timestamps on the console in real-time.

---

## 📁 Directory Structure

```text
├── backend/                  # Express REST API (CommonJS)
│   ├── config/               # DB configurations
│   │   └── db.js
│   ├── controllers/          # CRUD Business Logic handlers
│   │   └── todoController.js
│   ├── models/               # Mongoose schemas
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes/               # Express endpoints
│   │   └── todoRoutes.js
│   ├── .env                  # Port & Mongo URI configs
│   ├── package.json          # Scoped package config
│   └── server.js             # API entrypoint, polyfills & logger
│
├── src/                      # Frontend App (ES Modules)
│   ├── components/           # Reusable UI Components
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Navbar.jsx
│   ├── context/              # Global Context State
│   │   └── AuthContext.jsx
│   ├── pages/                # Page Containers
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── routes/               # Client-side Router configs
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/             # Live REST API wrappers & mappers
│   │   └── api.js
│   ├── App.jsx               # Main App wrapper & context provider
│   ├── index.css             # Modular Global Design Tokens & transitions
│   └── main.jsx              # React entrypoint
```

---

## 🛠️ How to Get Started

### 1. MongoDB Setup
Ensure MongoDB is running locally on your default port:
```text
mongodb://127.0.0.1:27017
```
*(If using MongoDB Atlas instead, simply update the `MONGO_URI` field in the `/backend/.env` file).*

### 2. Install Project Dependencies
Run from the root directory:
```bash
npm install
```

### 3. Run the Backend API Server
```bash
npm run server
```
*Your console will log:*
```bash
✅ MongoDB connected: 127.0.0.1
🚀 Server running on http://localhost:5050
```

### 4. Run the React Frontend App (Separate Terminal)
```bash
npm run dev
```

---

## 💡 Architecture & Integration Insights

* **API Decoupling & Field Mapping**: The Mongoose Todo schema is defined with `title` (required/trimmed) and Mongoose outputs `_id`. The React frontend UI (`Home.jsx`) consumes `text` and `id`. To prevent refactoring the entire user interface, the API client maps these values gracefully in `src/services/api.js` on incoming/outgoing requests.
* **Global Error Handling**: Unhandled routes and operational exceptions throw custom, uniform JSON structures (`{ success: false, message: ... }`) back to the React app to let developers catch issues easily.
* **Port Conflict & Node 18 Resiliency**: Out-of-the-box Windows system port 5000 lockups and missing `crypto` context under Node v18 are entirely handled, ensuring a seamless environment initialization.
