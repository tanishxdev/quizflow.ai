# QuizFlow.ai — Backend

QuizFlow.ai backend is a **complete, production‑ready API** for an AI‑assisted quiz, assessment, and learning‑analytics platform.

This backend is intentionally built **frontend‑agnostic** so that **any frontend (Web, Mobile, Admin dashboard)** can be developed independently on top of it.

The focus of this backend is:

- correctness
- clean architecture
- security
- extensibility
- interview‑grade engineering

---

## 1. What This Backend Is

QuizFlow.ai backend provides:

- Authentication & authorization layer
- Quiz generation APIs
- Quiz attempt lifecycle management
- Result evaluation engine
- Learning analytics engine
- Fully documented APIs via Swagger

It acts as the **single source of truth** for:

- users
- quizzes
- attempts
- results
- analytics

---

## 2. What This Backend Is NOT

This backend intentionally does **not**:

- render UI
- manage frontend state
- contain presentation logic
- depend on any specific frontend framework

Frontend teams are expected to:

- consume APIs
- handle UI/UX
- manage routing, state, and charts

---

## 3. High‑Level Architecture

```
Client (Web / Mobile / Admin)
        ↓
     REST APIs
        ↓
   Express Routes
        ↓
 Controllers (HTTP Layer)
        ↓
 Services (Business Logic)
        ↓
   MongoDB (Persistence)
```

Supporting layers:

- Auth middleware
- Validation layer
- Analytics engine
- Central error handling

---

## 4. Core Features (Complete)

### 4.1 Authentication & Security

- Email‑based login (JWT)
- Stateless authentication
- Auth middleware for route protection
- Ownership‑based authorization (user‑scoped data)

**Note:** OAuth (Google / Clerk) is intentionally deferred and can be added without refactor.

---

### 4.2 Quiz Generation Engine

- Generate quizzes by:
  - subject
  - topic
  - number of questions

- Difficulty tagging per question
- Quiz and question persistence

Designed so AI generation can be:

- Gemini
- OpenAI
- local/mock

without changing API contracts.

---

### 4.3 Attempt Engine (Quiz Lifecycle)

- Start quiz attempt
- One active attempt per quiz per user
- Save answers per question
- Track time spent per question
- Prevent resubmission or tampering

Attempts become **immutable** once submitted.

---

### 4.4 Result Engine

- Calculate:
  - total questions
  - correct / incorrect
  - accuracy
  - total time spent

- Difficulty‑wise performance
- Topic‑wise performance

Results are **derived**, not stored redundantly.

---

### 4.5 Analytics Engine

Persistent learning analytics including:

- Subject‑wise performance
- Topic‑wise accuracy
- Difficulty‑wise accuracy
- Attempt history
- Consistency score
- Weak / strong topic classification

Analytics are updated **only after successful submission**, ensuring correctness.

---

### 4.6 API Documentation (Swagger)

- Complete Swagger (OpenAPI) documentation
- JWT‑protected endpoints supported in Swagger UI
- Frontend teams can:
  - explore APIs
  - test requests
  - view schemas

Swagger endpoint:

```
GET /docs
```

---

## 5. Backend Guarantees

This backend guarantees:

- No invalid data reaches business logic
- No cross‑user data access
- No partial analytics updates
- Deterministic result calculation
- Safe startup & shutdown
- Predictable error responses

---

## 6. Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Swagger (OpenAPI)
- Helmet + Rate limiting
- Nodemon (development)

---

## 7. Folder Structure (Authoritative)

```
backend/
├── src/
│   ├── analytics/        # Analytics logic
│   ├── attempt/          # Attempt lifecycle
│   ├── auth/             # Authentication
│   ├── config/           # Env & DB config
│   ├── middlewares/      # Auth & error handling
│   ├── models/           # MongoDB schemas
│   ├── quiz/             # Quiz generation
│   ├── result/           # Result engine
│   ├── routes/           # API routes
│   ├── utils/            # Helpers
│   ├── app.js
│   └── server.js
├── .env
├── nodemon.json
├── package.json
└── README.md
```

---

## 8. How Frontend Should Use This Backend

### Authentication Flow

1. `POST /auth/login`
2. Receive JWT
3. Send JWT in `Authorization: Bearer <token>` header

### Quiz Flow

1. Generate quiz → `/quiz/generate`
2. Start attempt → `/attempt/quiz/:quizId/start`
3. Save answers → `/attempt/attempt/:attemptId/answer`
4. Submit quiz → `/attempt/attempt/:attemptId/submit`
5. Fetch result → `/result/attempt/:attemptId/result`

### Analytics Flow

- Overview → `/analytics/overview`
- Subject analytics → `/analytics/subject/:subject`
- Attempts → `/analytics/attempts`
- Consistency → `/analytics/consistency`
- Topics → `/analytics/topics`

---

## 9. Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quizflow
JWT_SECRET=your_secret_key
```

---

## 10. What Is Intentionally Not Implemented Yet

These are **future extensions**, not missing pieces:

- Google / OAuth login
- Admin panel
- Role‑based access
- Realtime quiz (WebSockets)
- Redis caching
- Deployment configs
- AI evaluation tuning

Backend is designed so all of these can be added **without breaking APIs**.

---

## 11. Project Status

✅ Backend: **Complete & stable**

Next logical steps:

- Frontend integration
- OAuth providers
- Deployment

---

## 12. Author

Built and designed by **Tanish**

This backend is intentionally engineered to reflect **real‑world backend systems**, not tutorial code.
