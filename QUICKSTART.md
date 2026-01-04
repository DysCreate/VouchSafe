# 🚀 VouchSafe – Quick Start Guide

## Prerequisites
- Node.js (v16+)
- MongoDB running locally or MongoDB Atlas URI
- PowerShell or Terminal

---

## Step 1: Start MongoDB

### Option A: Local MongoDB
```powershell
# If MongoDB is installed locally, start it
mongod
```

### Option B: MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `backend/.env` with your `MONGO_URI`

---

## Step 2: Setup & Run Backend

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# (Optional) Seed demo data for quick testing
node seed.js

# Start backend server
npm run dev
```

Backend will run at `http://localhost:4000`

**Demo Accounts** (if you ran `seed.js`):
- Employee: `demo.plumber@vouchsafe.com` / `demo123`
- Employer: `demo.employer@vouchsafe.com` / `demo123`

---

## Step 3: Setup & Run Frontend

```powershell
# Open a new terminal window
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

Frontend will run at `http://localhost:3000`

---

## Step 4: Test the Application

### Create New Accounts
1. Navigate to `http://localhost:3000`
2. Click "Register"
3. Create an **EMPLOYEE** account with:
   - Name: Your Name
   - Email: your.email@test.com
   - Password: test123
   - Role: Employee
4. Open an incognito/private window
5. Create an **EMPLOYER** account

### Test Job Flow
1. **As Employer**:
   - Click "Search Employees"
   - Search by skill (e.g., "plumber")
   - View employees ranked by Trust Score
   - Click "Send Job Request"
   - Enter service description

2. **As Employee**:
   - View incoming job request in dashboard
   - See your Trust Score
   - Click "Accept" on the job
   - Notice employer contact details now visible

3. **Complete Job**:
   - Either employer or employee can mark complete
   - Trust Score automatically recalculates
   - Completed job count increments

---

## 🎯 API Testing (Optional)

Test API endpoints directly:

```powershell
# Register employee
Invoke-RestMethod -Uri http://localhost:4000/api/auth/register -Method POST -Body (@{name="Test User"; email="test@test.com"; password="pass123"; role="EMPLOYEE"} | ConvertTo-Json) -ContentType "application/json"

# Login
$response = Invoke-RestMethod -Uri http://localhost:4000/api/auth/login -Method POST -Body (@{email="test@test.com"; password="pass123"} | ConvertTo-Json) -ContentType "application/json"
$token = $response.token

# Get employee dashboard (replace TOKEN)
Invoke-RestMethod -Uri http://localhost:4000/api/employees/dashboard -Headers @{Authorization="Bearer $token"}
```

---

## 🔍 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check `.env` has correct `MONGO_URI`
- Verify port 4000 is available

### Frontend won't start
- Ensure backend is running first
- Verify port 3000 is available
- Check `src/services/api.js` has correct backend URL

### No employees showing in search
- Run `node seed.js` to create demo employees
- Or register new employee accounts and add skills manually

---

## 📊 Trust Score Formula

```
Base = completedJobs × 10
Vouch = (avgVouchRating × 5)
Penalty = rejectedJobs × 5
Decay = inactivity > 30 days ? 0.9^(inactivityMonths) : 1

Trust Score = max(0, (Base + Vouch - Penalty) × Decay)
```

---

## 🎥 Demo Script for Presentation

1. **Show Login/Register** (30 sec)
   - "VouchSafe uses role-based authentication"
   
2. **Employee Dashboard** (30 sec)
   - "Employees see their Trust Score and incoming job requests"
   
3. **Employer Search** (1 min)
   - "Employers search and see ranked employees by Trust Score"
   - Send job request
   
4. **Job Acceptance** (30 sec)
   - "Only after acceptance do contact details become visible"
   
5. **Job Completion** (30 sec)
   - "Completing jobs automatically updates Trust Score"
   - Show updated score in employee dashboard

**Total demo time**: ~3 minutes

---

## ✅ You're Ready!

Your VouchSafe application is now running and ready for demo. 🎉

**Need help?** Check [SETUP_VERIFICATION.md](SETUP_VERIFICATION.md) for full feature checklist.
