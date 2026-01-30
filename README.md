# QuizFlow.ai

This is a **full-stack project (Frontend + Backend)** for an
**AI-powered quiz and learning platform**.

🚧 **Project Status: Building / Learning Phase**
This project is actively being developed step by step.

---

## What is this project?

QuizFlow.ai allows users to:

- Generate quizzes from topics or subjects
- Attempt quizzes with time tracking
- Get results calculated by backend
- See basic learning analytics
- Use AI (Gemini) to generate quiz questions

Right now, the focus is on **building the system correctly**, not UI polish.

---

## Project Structure

```
quizflow.ai/
├── frontend/   # Frontend (UI) – under development
├── backend/    # Backend (API + DB + AI) – mostly completed
└── README.md   # This file
```

---

## Backend (Current Focus)

The backend handles:

- User authentication (JWT)
- Quiz generation (Gemini AI + mock fallback)
- Quiz attempts and answer saving
- Result calculation
- Learning analytics

Tech used:

- Node.js
- Express.js
- MongoDB
- JWT
- Gemini AI

👉 Detailed instructions are inside `backend/README.md`

---

## Frontend (Work in Progress)

The frontend will handle:

- User interface
- Quiz screens
- Timers
- Result dashboard
- Analytics charts

Planned tech:

- React / Next.js
- API integration with backend

👉 Frontend is **still under development**.

---

## How to Run the Project (Current)

At the moment:

- Backend can be run independently
- Frontend is not fully connected yet

### Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

Frontend instructions will be added later.

---

## Project Status Summary

| Part           | Status             |
| -------------- | ------------------ |
| Backend core   | ✅ Mostly complete |
| AI integration | ✅ Done (Gemini)   |
| Analytics      | ✅ Basic version   |
| Frontend UI    | 🚧 In progress     |
| Google login   | ⏳ Planned         |
| Deployment     | ⏳ Planned         |

---

## Why this project exists

This project is built to:

- Learn backend engineering properly
- Understand system design
- Practice clean architecture
- Learn how to integrate AI safely
- Build confidence with full-stack projects

This is **not a tutorial clone**, it’s a learning + building project.

---

## Notes

- APIs may change during development
- Code will be refactored as learning improves
- Features are added step by step

---

## Author

Built by **Tanish**
Learning backend & full-stack development 🚀
