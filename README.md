# VouchSafe – Production-Ready Full-Stack Application

**Tech Stack:**
- **Backend**: Node.js + Express + MongoDB + Mongoose + JWT
- **Frontend**: React + Vite + Tailwind CSS + Axios

---

## 🚀 Quick Start

### 1. Backend Setup

```powershell
cd backend
cp .env.example .env
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/vouchsafe
JWT_SECRET=replace_with_strong_secret
PORT=4000
```

Install dependencies and run:
```powershell
npm install
npm run dev
```

Backend runs at `http://localhost:4000`.

### 2. Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

---

## 📖 Features

### User Roles
- **Employee**: Creates skill profile, builds Trust Score, accepts/rejects job requests
- **Employer**: Searches employees by Trust Score, sends job requests

### Trust Score Engine
- Base points from completed jobs
- Weighted vouching from community
- Penalties for rejected jobs
- Inactivity decay (30+ days)

### Job Workflow
1. Employer searches employees ranked by Trust Score
2. Employer sends job request
3. Employee accepts → both see contact details (name, phone, email)
4. Job completion updates Trust Score

---

## 🧱 Backend Structure

```
backend/
├── src/
│   ├── models/          User, EmployeeProfile, Job, Vouch, TrustLog
│   ├── controllers/     Auth, employees, employers, jobs, vouches
│   ├── routes/          REST API endpoints
│   ├── services/        Trust calculation, distance helpers
│   ├── middleware/      Auth (JWT), role-based access
│   ├── app.js           Express app setup
│   └── server.js        Entry point
```

---

## 🎨 Frontend Structure

```
frontend/
├── src/
│   ├── pages/           Login, Register, Dashboards, Search, Profile
│   ├── components/      TrustBadge, EmployeeCard, JobRequestCard
│   ├── services/        API wrapper (Axios)
│   ├── routes/          ProtectedRoute (role-based)
│   └── App.jsx          React Router setup
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` – Register user (EMPLOYEE | EMPLOYER)
- `POST /api/auth/login` – Login and get JWT

### Employees
- `GET /api/employees/search?skill=` – Search employees by skill & Trust Score
- `GET /api/employees/profile/:id` – Get employee profile
- `GET /api/employees/dashboard` – Get employee dashboard (protected)

### Employers
- `GET /api/employers/dashboard` – Get employer dashboard (protected)
- `POST /api/employers/job-request` – Send job request

### Jobs
- `POST /api/jobs/:id/accept` – Accept job
- `POST /api/jobs/:id/reject` – Reject job
- `POST /api/jobs/:id/complete` – Mark job complete (triggers Trust Score recalc)

### Vouches
- `POST /api/vouches/create` – Create vouch (1-5 rating)

---

## 🧪 Demo Flow

1. **Register** as EMPLOYEE (create skill profile)
2. **Register** as EMPLOYER
3. **Employer** searches employees by skill → sees ranked by Trust Score
4. **Employer** sends job request
5. **Employee** accepts job → both see contact details
6. **Complete job** → Employee Trust Score updates
7. **Vouch** for employee → Trust Score increases

---

## 🛠️ Production Notes

- Set strong `JWT_SECRET` in `.env`
- Use production MongoDB (Atlas, etc.)
- Enable HTTPS and secure headers
- Add rate limiting (express-rate-limit)
- Add input validation (express-validator)

---

## 📦 Dependencies

### Backend
- `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`, `morgan`

### Frontend
- `react`, `react-dom`, `react-router-dom`, `axios`, `tailwindcss`, `vite`

---

