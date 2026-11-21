# EVENTORA — Event Inspiration & Management (MERN)

A starter full-stack project using React (HTML-like JSX), CSS, JavaScript, Node, Express and MongoDB.

## Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas connection string

## Run backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Set `MONGO_URI` in `backend/.env`.

## Run frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Included
- Event inspiration gallery with category filters
- Design gallery
- Photography pose ideas
- Budget calculator (client-side)
- Booking request form saved to MongoDB
- Admin API endpoints to list/update bookings (basic demo protection via `ADMIN_KEY`)

## Important
This is a college-project starter, not a production booking/payment system. Before public deployment add proper authentication, authorization, validation, rate limiting, secure image uploads and payment-provider integration. Admin routes use a simple demo key, not full user authentication.
