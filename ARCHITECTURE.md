# ARCHITECTURE.md — AIBudge

> System design, stack decisions, and how the pieces fit together.

---

## Overview

AIBudge is a full-stack web application with a clear separation between a React frontend and a Node.js/Express backend. The two communicate over a REST API, with the frontend deployed on Vercel and the backend running as a standalone Node process.

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│   React App (Vercel)                             │
│   ├── Landing Page                               │
│   ├── Auth Pages (Sign Up / Login / Reset)       │
│   ├── Spend Form  (6-step progressive form)      │
│   └── Summary Report + PDF Download             │
└──────────────────┬──────────────────────────────┘
                   │  HTTP / REST (JSON)
                   ▼
┌─────────────────────────────────────────────────┐
│            Node.js / Express Backend             │
│   ├── Auth routes  (/api/auth/*)                 │
│   ├── Audit routes (/api/audit/*)                │
│   └── Middleware (JWT verify, error handler)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│                  Database                        │
│   ├── users   (id, email, password_hash, …)     │
│   └── audits  (id, user_id, answers, …)         │
└─────────────────────────────────────────────────┘
```

---

## Frontend

**Framework:** React (Vite)  
**Routing:** React Router v6  
**PDF Export:** html2pdf.js (client-side, no server round-trip)

### Page Flow

```
/               → LandingPage
/signup         → SignUp
/login          → Login
/forgot         → ForgotPassword
/form           → SpendForm  (protected)
/report         → SummaryReport  (protected, receives form state via useNavigate)
```

### State Management

There is no global state library. State flows in two ways:

- **Within the form** — `useState` tracks answers to each of the 6 questions locally in the `SpendForm` component.
- **Form → Report** — on submission, `useNavigate` passes the completed answers as Router state to `SummaryReport`. This keeps the codebase flat and avoids Redux/Zustand boilerplate for what is a linear, 3-page flow.

### Component Structure

```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── SignUp.jsx
│   ├── Login.jsx
│   ├── ForgotPassword.jsx
│   ├── SpendForm.jsx
│   └── SummaryReport.jsx
└── components/
    ├── Navbar.jsx
    └── Button.jsx          ← reusable button used across all form questions
```

---

## Backend

**Runtime:** Node.js  
**Framework:** Express  
**Auth:** JWT (JSON Web Tokens) + bcrypt for password hashing  
**Email:** Transactional email for password reset links

### API Routes

```
POST   /api/auth/register          Create new user account
POST   /api/auth/login             Authenticate and return JWT
POST   /api/auth/forgot-password   Send reset link to email
POST   /api/auth/reset-password    Update password via reset token

POST   /api/audit                  Save a completed audit (auth required)
GET    /api/audit                  List all audits for current user (auth required)
GET    /api/audit/:id              Fetch a single audit (auth required, owner only)
```

### Middleware

```
verifyToken     → checks Authorization: Bearer <jwt> on protected routes
errorHandler    → catches unhandled errors, returns 500 without leaking stack traces
```

---

## Database Schema

Two core tables. Schema is minimal by design — enough to persist user identity and audit results without over-engineering for a 4-day build.

```sql
-- Users
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  reset_token     TEXT,
  reset_token_exp TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Audits
CREATE TABLE audits (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  answers     JSONB NOT NULL,   -- stores all 6 form answers
  created_at  TIMESTAMP DEFAULT NOW()
);
```

Form answers are stored as JSONB so the schema doesn't need to change as questions evolve.

---

## Key Technical Decisions

### Language: JavaScript (across the full stack)

JavaScript was the deliberate choice for both frontend and backend. I knew the language well, and given the 4-day constraint, switching to an unfamiliar language would have cost more time than it could have saved. Using JavaScript end-to-end also meant I could share mental models, move fast, and not context-switch between syntax. It was the right call for the time I had.

### Separate frontend / backend instead of Next.js

Keeping React and Express as separate processes lets each layer be deployed and scaled independently. The trade-off is a slightly more involved local setup (two `npm install` steps, CORS config, two deployment targets), but it makes the architecture easier to reason about and avoids coupling framework choices across layers.

### Client-side PDF via html2pdf.js

The Summary Report is rendered as a styled HTML page, making client-side PDF generation a natural fit. html2pdf.js captures the DOM and produces the PDF entirely in the browser — no server endpoint, no file storage, instant download. The trade-off is some layout inconsistency across browsers, which is acceptable for v1.

### Router state for form → report data passing

Rather than lifting state into a global store, the form passes its completed answers to the report page via React Router's `state` option in `useNavigate`. This is simple, requires no extra dependencies, and works perfectly for a linear flow. The known trade-off — data is lost on page refresh — is covered by also persisting audits to the database.

### Manually curated pricing data

No major AI provider exposes a public pricing API, and scraping is fragile. Pricing is maintained in `PRICING_DATA.md` with source URLs and verification dates, making staleness transparent. This also gives the dataset credibility — every number is traceable to its source.

---

## Data Flow: Audit Lifecycle

```
1. User fills SpendForm
        ↓
2. On submit → POST /api/audit  (answers saved to DB)
        ↓
3. useNavigate passes answers as Router state to SummaryReport
        ↓
4. SummaryReport computes: monthly spend, annual spend, savings
        ↓
5. User clicks "Download PDF" → html2pdf.js renders DOM to PDF in-browser
```

---

## Deployment

| Layer | Host | Notes |
|-------|------|-------|
| Frontend | Vercel | Auto-deploys from `main` branch |
| Backend | Any Node host (Railway / Render recommended) | Set env vars: `DATABASE_URL`, `JWT_SECRET`, `EMAIL_*` |
| Database | Managed Postgres (e.g. Supabase, Railway Postgres) | Connection string via `DATABASE_URL` |

---

## What Would Change at Scale

- **Caching** — pricing data is static; a Redis cache or CDN-level cache on the audit recommendation logic would reduce DB reads significantly.
- **LLM integration** — Ollama (planned) would run as a sidecar service, called from the backend after the audit is saved, appending AI-generated recommendations to the audit record.
- **Queue for emails** — password reset emails currently fire inline; at volume these should go through a job queue (BullMQ or similar).
- **Automated tests** — the manual test suite in `TESTS.md` should migrate to Vitest (unit/component) and Playwright (E2E) before adding more features.

---