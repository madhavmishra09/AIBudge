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
| Discipline | 8/10 | I stayed consistent with development even when debugging became exhausting and time-consuming. |
| Code Quality | 7/10 | The code works well overall, but there is still room for improvement in structure and optimization. |
| Design Sense | 6/10 | The UI is functional, but I still need to improve visual polish and overall user experience. |
| Problem Solving | 8/10 | I was able to debug complex issues by testing hypotheses step by step and tracing problems carefully. |
| Entrepreneurial Thinking | 8/10 | I continuously thought about how to improve the product into something users would genuinely like and use. |