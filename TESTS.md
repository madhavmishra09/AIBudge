# TESTS.md — AIBudge Test Suite

> **Project:** AIBudge — AI Subscription Usage Tracker  
> **Stack:** React (frontend) · Node.js/Express (backend) · Database (schema-based)  
> **Live:** https://ai-budge.vercel.app  
> **Last Updated:** 2026-05-10

---

## Table of Contents

1. [Authentication Tests](#1-authentication-tests)
2. [Navigation & Routing Tests](#2-navigation--routing-tests)
3. [Spend Input Form Tests](#3-spend-input-form-tests)
4. [Summary Report Tests](#4-summary-report-tests)
5. [PDF Download Tests](#5-pdf-download-tests)
6. [Pricing Data Accuracy Tests](#6-pricing-data-accuracy-tests)
7. [Backend API Tests](#7-backend-api-tests)
8. [Database Schema Tests](#8-database-schema-tests)
9. [UI / UX Tests](#9-ui--ux-tests)
10. [Edge Cases & Negative Tests](#10-edge-cases--negative-tests)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass |
| ❌ | Fail |
| ⏳ | Pending / Not yet tested |
| 🔁 | Flaky / Needs re-test |

---

## 1. Authentication Tests

### 1.1 Sign Up

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|----------------|--------|
| AUTH-01 | Valid sign-up with new email | Enter unique email + strong password → Submit | Account created; user redirected to dashboard/form | ⏳ |
| AUTH-02 | Sign-up with already-registered email | Use an existing email → Submit | Error message: "Email already in use" or similar | ⏳ |
| AUTH-03 | Sign-up with empty fields | Leave email or password blank → Submit | Validation error shown; form not submitted | ⏳ |
| AUTH-04 | Sign-up with invalid email format | Enter `notanemail` → Submit | Inline validation error on email field | ⏳ |
| AUTH-05 | Sign-up with weak password | Enter `123` as password → Submit | Error: password too weak / minimum length requirement | ⏳ |
| AUTH-06 | Password confirmation mismatch | Enter different values in password and confirm-password → Submit | Error: "Passwords do not match" | ⏳ |

### 1.2 Login

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|----------------|--------|
| AUTH-07 | Valid login with correct credentials | Enter registered email + correct password → Submit | User logged in; redirected to home/dashboard | ⏳ |
| AUTH-08 | Login with wrong password | Correct email + wrong password → Submit | Error: "Invalid credentials" | ⏳ |
| AUTH-09 | Login with unregistered email | Unknown email → Submit | Error: "User not found" or generic auth error | ⏳ |
| AUTH-10 | Login with empty fields | Submit with blank form | Validation errors shown | ⏳ |
| AUTH-11 | Session persists after page refresh | Log in → Refresh page | User remains logged in (session/token valid) | ⏳ |
| AUTH-12 | Logout clears session | Click logout → Try to access protected route | Redirected to login page | ⏳ |

### 1.3 Forgot Password

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|----------------|--------|
| AUTH-13 | Request password reset with valid email | Enter registered email on forgot-password page → Submit | Success message: "Reset link sent to your email" | ⏳ |
| AUTH-14 | Request password reset with unregistered email | Enter unknown email → Submit | Error or a neutral message (no user enumeration) | ⏳ |
| AUTH-15 | Reset link works and allows new password | Click reset link → Enter new password → Submit | Password updated; able to log in with new password | ⏳ |
| AUTH-16 | Expired or invalid reset token | Use old/tampered reset link | Error: "Link is invalid or expired" | ⏳ |

---

## 2. Navigation & Routing Tests

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| NAV-01 | Landing page loads at root `/` | Landing page renders with correct headline and CTA button | ⏳ |
| NAV-02 | Navbar links are visible on all pages | All nav links (Home, About, Login, etc.) render correctly | ⏳ |
| NAV-03 | CTA button on landing page navigates to form | Clicking the CTA takes user to `/form` or spend-input page | ⏳ |
| NAV-04 | Form → Summary Report navigation after submission | After submitting the form, user lands on the Summary Report page | ⏳ |
| NAV-05 | Unauthenticated user redirected from protected route | Visit `/report` or `/dashboard` without login → Redirected to `/login` | ⏳ |
| NAV-06 | Back-button behavior from report to form | Browser back from report goes back to form (not blank) | ⏳ |
| NAV-07 | 404 page for unknown routes | Visit `/xyz-nonexistent` → 404 page or redirect to home | ⏳ |

---

## 3. Spend Input Form Tests

The form collects 6 progressive questions about AI tool usage and spending.

### 3.1 Question Flow

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| FORM-01 | Form loads with Question 1 visible | First question appears; no other questions shown | ⏳ |
| FORM-02 | Selecting an answer on Q1 reveals Q2 | After button click on Q1, Q2 becomes visible/enabled | ⏳ |
| FORM-03 | All 6 questions can be answered in sequence | Progressive flow works end-to-end without errors | ⏳ |
| FORM-04 | Selected button is visually highlighted | Clicked answer button shows active/selected state | ⏳ |
| FORM-05 | Changing answer on an earlier question resets later answers | Going back to Q1 and re-selecting resets Q2–Q6 | ⏳ |

### 3.2 AI Tool Selection

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| FORM-06 | All expected tools shown as options | Cursor, GitHub Copilot, Claude, ChatGPT, Gemini, OpenAI API, Other all appear | ⏳ |
| FORM-07 | Selecting "Other" reveals a text area | "Other" option reveals a free-text input for custom tool name | ⏳ |
| FORM-08 | "Other" text area accepts free-form input | User can type custom tool name; value passes to report | ⏳ |
| FORM-09 | "Other" text area hidden when a named tool is selected | Switching from "Other" to a named tool hides the textarea | ⏳ |

### 3.3 Spend / Usage Questions

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| FORM-10 | Monthly spend options cover free tier | "Free / $0" option is present | ⏳ |
| FORM-11 | Spend amount selected is carried to report | Value chosen in form appears correctly in summary report | ⏳ |
| FORM-12 | Purpose field (what they use AI for) is captured | Selected purpose(s) shown in report | ⏳ |
| FORM-13 | Form state passed correctly via React Router state | `useNavigate` carries all 6 answers to the report component | ⏳ |
| FORM-14 | Form cannot be submitted incomplete | Attempting to proceed without answering a required question shows an error or prevents navigation | ⏳ |

---

## 4. Summary Report Tests

### 4.1 Report Rendering

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| RPT-01 | Report page renders after form submission | Summary report component loads with user's data | ⏳ |
| RPT-02 | User's selected AI tools are displayed | All tools selected in form appear in the report | ⏳ |
| RPT-03 | Monthly spend total is displayed | The spend amount from the form is shown correctly | ⏳ |
| RPT-04 | Annual spend is calculated correctly | Annual = Monthly × 12; value shown in report | ⏳ |
| RPT-05 | Cheaper alternative suggestions are shown | At least one cheaper plan/tool is recommended | ⏳ |
| RPT-06 | Potential savings figure is calculated | Savings = Current spend − Recommended spend; displayed clearly | ⏳ |
| RPT-07 | Purpose/use-case from "Other" field appears | Custom purpose text flows through to report correctly | ⏳ |

### 4.2 Report Accuracy

| Test ID | Description | Input | Expected Output | Status |
|---------|-------------|-------|----------------|--------|
| RPT-08 | Claude Pro plan user | Tool: Claude, Plan: Pro ($17/mo) | Annual: $204; suggests Free tier as savings option | ⏳ |
| RPT-09 | ChatGPT Plus India user | Tool: ChatGPT, Plan: Plus (INR 1999/mo) | Annual: INR 23,988; recommends Go (free) tier | ⏳ |
| RPT-10 | Cursor Pro user | Tool: Cursor, Plan: Pro ($20/mo) | Annual: $240; Hobby (free) shown as an option | ⏳ |
| RPT-11 | GitHub Copilot Pro+ user | Tool: Copilot, Plan: Pro+ ($39/mo) | Annual: $468; free or Pro ($10) shown as alternative | ⏳ |
| RPT-12 | Free tier user | Tool: any, Plan: Free | Report shows $0 spend; no cheaper option available | ⏳ |
| RPT-13 | Multi-tool user (multiple selections) | Tools: Claude + ChatGPT | Combined spend shown; alternatives for each tool | ⏳ |

---

## 5. PDF Download Tests

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| PDF-01 | "Download PDF" button is visible on report page | Button renders without console errors | ⏳ |
| PDF-02 | Clicking button triggers PDF download | Browser initiates file download with `.pdf` extension | ⏳ |
| PDF-03 | PDF contains the correct report data | Opened PDF matches on-screen report (tools, spend, savings) | ⏳ |
| PDF-04 | PDF filename is sensible | File saved as `ai-budge-report.pdf` or similar (not `undefined.pdf`) | ⏳ |
| PDF-05 | PDF renders on mobile viewport | Download works on mobile; PDF is readable | ⏳ |
| PDF-06 | html2pdf.js loads without CDN failure | No `Failed to load resource` errors in console | ⏳ |

---

## 6. Pricing Data Accuracy Tests

Verify the data in `PRICING_DATA.md` matches the live product pages (verified 2026-05-06).

| Test ID | Tool | Plan | Price in Data | Verified Against |
|---------|------|------|--------------|-----------------|
| PRICE-01 | Cursor | Hobby | Free | https://cursor.com/pricing |
| PRICE-02 | Cursor | Pro | $20/month | https://cursor.com/pricing |
| PRICE-03 | Cursor | Ultra | $200/month | https://cursor.com/pricing |
| PRICE-04 | GitHub Copilot | Free | Free | https://github.com/features/copilot/plans |
| PRICE-05 | GitHub Copilot | Pro | $10/month | https://github.com/features/copilot/plans |
| PRICE-06 | GitHub Copilot | Pro+ | $39/month | https://github.com/features/copilot/plans |
| PRICE-07 | Claude | Free | Free | https://claude.ai/upgrade |
| PRICE-08 | Claude | Pro | $17/month | https://claude.ai/upgrade |
| PRICE-09 | Claude | Max | $100/month | https://claude.ai/upgrade |
| PRICE-10 | ChatGPT (India) | Plus | INR 1999/month | https://chatgpt.com/#pricing |
| PRICE-11 | Gemini (India) | AI Plus | INR 399/month | https://gemini.google/subscriptions/ |
| PRICE-12 | Gemini (India) | AI Ultra | INR 24,500/month | https://gemini.google/subscriptions/ |

> **Note:** Re-verify these prices monthly — AI tool pricing changes frequently.

---

## 7. Backend API Tests

### 7.1 Auth Endpoints

| Test ID | Endpoint | Method | Payload | Expected Status | Expected Body | Status |
|---------|----------|--------|---------|----------------|--------------|--------|
| API-01 | `/api/auth/register` | POST | `{ email, password }` | 201 | `{ message: "User created", userId }` | ⏳ |
| API-02 | `/api/auth/register` | POST | Duplicate email | 409 | `{ error: "Email already exists" }` | ⏳ |
| API-03 | `/api/auth/login` | POST | Valid credentials | 200 | `{ token, user }` | ⏳ |
| API-04 | `/api/auth/login` | POST | Wrong password | 401 | `{ error: "Invalid credentials" }` | ⏳ |
| API-05 | `/api/auth/forgot-password` | POST | `{ email }` | 200 | `{ message: "Reset email sent" }` | ⏳ |
| API-06 | `/api/auth/reset-password` | POST | `{ token, newPassword }` | 200 | `{ message: "Password updated" }` | ⏳ |
| API-07 | `/api/auth/reset-password` | POST | Expired token | 400 | `{ error: "Token expired or invalid" }` | ⏳ |

### 7.2 Form Data / Audit Endpoints

| Test ID | Endpoint | Method | Auth | Payload | Expected Status | Status |
|---------|----------|--------|------|---------|----------------|--------|
| API-08 | `/api/audit` | POST | Bearer token | Form answers object | 201 — audit saved | ⏳ |
| API-09 | `/api/audit` | POST | No token | Form answers | 401 — Unauthorized | ⏳ |
| API-10 | `/api/audit/:id` | GET | Bearer token | — | 200 — returns saved audit | ⏳ |
| API-11 | `/api/audit/:id` | GET | Different user's token | — | 403 — Forbidden | ⏳ |
| API-12 | `/api/audit` | GET | Bearer token | — | 200 — list of user's audits | ⏳ |

### 7.3 General API Behaviour

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| API-13 | All routes return JSON content-type | `Content-Type: application/json` on all responses | ⏳ |
| API-14 | CORS headers allow frontend origin | Requests from `ai-budge.vercel.app` not blocked | ⏳ |
| API-15 | Missing required fields return 400 | POST with incomplete body → `400 Bad Request` + field errors | ⏳ |
| API-16 | Server handles unexpected errors with 500 | Simulate DB error → `500 Internal Server Error` (no stack trace leaked) | ⏳ |

---

## 8. Database Schema Tests

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| DB-01 | Users table has required columns | `id`, `email`, `password_hash`, `created_at` exist | ⏳ |
| DB-02 | Email column has unique constraint | Inserting duplicate email raises unique constraint error | ⏳ |
| DB-03 | Passwords are stored hashed | `password_hash` field contains bcrypt hash, not plaintext | ⏳ |
| DB-04 | Audit table stores all 6 form answers | All question responses are persisted with `user_id` FK | ⏳ |
| DB-05 | Audit rows are linked to the correct user | `audit.user_id` matches the authenticated user's `id` | ⏳ |
| DB-06 | Reset-token table / column exists | `password_reset_token` and `reset_token_expires` (or similar) present | ⏳ |
| DB-07 | Cascading delete on user removal | Deleting a user also removes their audits (cascade or handled in code) | ⏳ |

---

## 9. UI / UX Tests

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| UX-01 | Landing page renders within 3 seconds on 4G | LCP < 3s (measure with Lighthouse) | ⏳ |
| UX-02 | Form buttons have sufficient tap target size | Each button ≥ 44×44px (WCAG 2.1 AA) | ⏳ |
| UX-03 | Error messages are clearly visible | Error text uses a distinct colour (red/amber) and is readable | ⏳ |
| UX-04 | Responsive layout on mobile (375px) | No horizontal overflow; all elements fit viewport | ⏳ |
| UX-05 | Responsive layout on tablet (768px) | Layout reflows correctly | ⏳ |
| UX-06 | Nav links wrap correctly on small screens | Navbar collapses or scrolls on narrow viewport | ⏳ |
| UX-07 | Report is readable without horizontal scroll | Summary report fits standard screen widths | ⏳ |
| UX-08 | Loading state shown during form submission | Spinner or disabled button while API call is in-flight | ⏳ |
| UX-09 | No console errors on page load | Browser console shows 0 errors on cold load | ⏳ |
| UX-10 | All images have alt text | Accessibility: `<img>` tags have descriptive `alt` attributes | ⏳ |

---

## 10. Edge Cases & Negative Tests

| Test ID | Description | Expected Result | Status |
|---------|-------------|----------------|--------|
| EDGE-01 | User submits form twice (double-click) | Only one audit saved; no duplicate record in DB | ⏳ |
| EDGE-02 | User visits report URL directly without form data | Graceful fallback: redirect to form or show empty-state | ⏳ |
| EDGE-03 | Very long "Other" tool name (500+ chars) | Input is truncated or validated; no layout breakage in report | ⏳ |
| EDGE-04 | User selects $0 spend but paid tool | Mismatch flagged or handled; no division-by-zero in savings calc | ⏳ |
| EDGE-05 | API called with malformed JSON body | Server returns `400` — not `500` | ⏳ |
| EDGE-06 | JWT token tampered/forged | Server rejects with `401 Unauthorized` | ⏳ |
| EDGE-07 | PDF download on slow network (throttled to 3G) | Download eventually completes; no JS timeout crash | ⏳ |
| EDGE-08 | Browser back button after logout | Cannot access previously authenticated page; redirected to login | ⏳ |
| EDGE-09 | XSS attempt in "Other" textarea | Script tags in input are sanitised; no alert() fires on report | ⏳ |
| EDGE-10 | Form resubmission on browser refresh | User prompted (`Confirm form resubmission`) or redirect prevents duplicate | ⏳ |

---

## Running Tests

> Tests are currently **manual** (documented above). Future work: migrate to automated testing with the stack below.

### Suggested Testing Stack

```
Frontend Unit/Component Tests  → Vitest + React Testing Library
Frontend E2E Tests             → Playwright or Cypress
Backend Unit Tests             → Jest + Supertest
API Contract Tests             → Supertest against local Express server
Database Tests                 → In-memory SQLite or test DB seeded with fixtures
```

### How to Run (once automated tests are set up)

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# E2E tests
npx playwright test
```

---

## Test Coverage Goals

| Area | Target Coverage |
|------|----------------|
| Authentication flows | 100% |
| Form question logic | 90%+ |
| Report calculations | 100% |
| API endpoints | 80%+ |
| UI responsiveness | Manual (all breakpoints) |

---

*Generated for AIBudge · https://github.com/madhavmishra09/AIBudge*