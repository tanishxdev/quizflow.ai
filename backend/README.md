# QuizFlow.ai (Backend)

This is the **backend** for an AI-powered quiz application.

The project is **currently in development** and being built step-by-step to learn **real backend engineering**.

---

## What this project does (currently)

- User login using JWT (email-based for now)
- Generate quizzes (AI via Gemini, with mock fallback)
- Store quizzes and questions in database
- Allow users to start quiz attempts
- Save answers with time tracking
- Submit quiz and calculate result
- Generate basic learning analytics (topic, difficulty, accuracy)

Frontend is **not connected yet**.
This repo is **backend only**.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Gemini AI (for quiz generation)

---

## Project Status

🚧 **Work in Progress**

Things are still being built and improved:

- APIs may change
- Code may be refactored
- Features are added step by step

This is a **learning + building project**, not production ready yet.

---

## Folder Structure (Simplified)

```
backend/
├── src/
│   ├── controllers/   # Handle HTTP requests
│   ├── services/      # Business logic
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── middlewares/   # Auth & error handling
│   ├── ai/            # Gemini AI integration
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

## How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quizflow
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## Basic API Flow (for testing)

1. Login
   `POST /auth/login`

2. Generate quiz
   `POST /quiz/generate`

3. Fetch quiz
   `GET /quiz/:quizId`

4. Start attempt
   `POST /attempt/start/:quizId`

5. Submit answers
   `POST /attempt/answer/:attemptId`

6. Submit quiz
   `POST /result/submit/:attemptId`

7. View analytics
   `GET /analytics/overview`

(All protected routes need JWT token)

---

## Why this project exists

This project is built to:

- Learn backend fundamentals properly
- Understand real system design
- Practice clean architecture
- Learn AI integration in backend safely

---

## Notes

- Frontend will be added later
- Google login will be added later
- Deployment will be done after stabilization

---

## Author

Built by **Tanish**

---
