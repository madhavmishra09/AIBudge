# Weekly Reflection

## 1. The hardest bug you hit this week, and how you debugged it

The hardest issue I faced this week was making the audit engine generate a proper report consistently. It took me almost an entire day to debug and fix. I started by checking whether the issue was coming from the backend logic, API routes, or the frontend response handling. I formed multiple hypotheses around incorrect imports, broken data flow, and response formatting issues. 

To debug it, I went through the project folder structure carefully, checked imports one by one, tested API responses manually, and verified whether the frontend was receiving the correct data. I also tried fixing multiple related issues simultaneously, some of which worked while others did not. Eventually, after reviewing the file structure and correcting import and response-handling mistakes, I was able to get the audit engine working properly.

---

## 2. A decision you reversed mid-week, and what made you reverse it

I did not make any major decision reversals this week. Most of my focus stayed on stabilizing the current implementation and improving the existing workflow instead of changing direction midway.

---

## 3. What you would build in week 2 if you had it

If I had another week, I would focus on:
- Improving the database structure and optimization
- Enhancing the UI to make the product look more polished and user-friendly
- Strengthening the backend for better scalability and performance

The overall goal would be to turn the project into a product that feels reliable and appealing for everyone who uses it.

---

## 4. How you used AI tools

I mainly used [ChatGPT](https://chatgpt.com?utm_source=chatgpt.com) and [GitHub Copilot](https://github.com/features/copilot?utm_source=chatgpt.com) during development. I used them primarily for backend logic suggestions, debugging assistance, and speeding up repetitive tasks such as creating pages and boilerplate code. 

However, I did not fully rely on AI-generated code without checking it myself. I manually wrote and verified a significant portion of the logic because I wanted to properly understand the implementation and avoid hidden issues.

One specific time the AI was wrong was when it suggested imports that did not match my actual project structure, which caused runtime errors. I caught the issue by manually tracing the imports and checking the folder hierarchy. Fixing those incorrect imports solved several related problems in the project.

---

## 5. Self-rating
 
| Skill | Rating | Reason |
|---|---|---|
| Discipline | **9/10** | You shipped a full-stack app with auth, a form, a report, PDF export, and a DB schema in 4 days while also writing DEVLOG, ECONOMICS, PRICING_DATA, TESTS, and ARCHITECTURE docs. Most people skip the docs entirely. You didn't. |
| Code Quality | **7/10** | Agree. Router state for form passing is a smart lightweight call, and the component split is clean. But without seeing tests passing and the backend fully integrated, 7 is the honest ceiling right now. |
| Design Sense | **6/10** | Fair self-assessment. The UX thinking is strong — button-based form instead of text inputs shows you thought about conversion — but visual polish is still a gap, and that tracks. |
| Problem Solving | **8.5/10** | The DEVLOG shows you unblocked yourself every single day without external help. Day 3 especially — integrating React Router state, conditional form fields, and client-side PDF in one session — that's solid debugging under pressure. |
| Entrepreneurial Thinking | **9/10** | You wrote an ECONOMICS.md with unit economics, CAC, LTV, and defensibility analysis. You thought about viral sharing, consulting upsells, and network effects. That's not what most developers do on a 4-day project. |
| Documentation | **9/10** | DEVLOG, PRICING_DATA with source URLs and verification dates, TESTS with 100+ cases, ECONOMICS, ARCHITECTURE — this is the level of rigour you'd expect from a team, not a solo 4-day sprint. |
 
**Overall: ~8/10**
 
The honest thing holding you back from a 9 is the gap between what's planned and what's wired up end-to-end — the LLM recommendations, charts, and automated tests are still open. Close those and the project tells a complete story.
 
The thing that stands out most isn't any single skill — it's that you treated a 4-day solo project like a real product. That's the part that's hard to teach.