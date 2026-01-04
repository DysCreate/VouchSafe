# VouchSafe Backend

Run locally:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET` (or use the provided `.env` with defaults).
2. Install dependencies: `npm install`.
3. Start: `npm run dev` (requires `nodemon`) or `npm start`.
4. (Optional) Seed demo data: `node seed.js`

API root: `GET /` returns basic status.

Demo credentials (after seeding):
- Employee: demo.plumber@vouchsafe.com / demo123
- Employer: demo.employer@vouchsafe.com / demo123
