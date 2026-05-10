# AI Stack Optimization Report

## Company AI Usage Analysis

### Current Stack Overview

| Category | Value |
|---|---|
| Tool | ${data.tool} |
| Plan | ${data.plan} |
| Monthly Spend | ${data.monthlySpend} |
| Seats | ${data.seats} |
| Team Size | ${data.teamSize} |
| Primary Use Case | ${data.useCase} |

---

# Optimization Summary

## Cost Efficiency Score

Provide a score from **1–10** evaluating how efficiently the current AI stack is being utilized.

Example:

> **7/10** — Good overall utilization, but several overlapping subscriptions and underused features were identified.

---

# Estimated Wasted Spend

Estimate the amount of unnecessary or avoidable AI spending.

Example:

> Approximately **$120/month** could potentially be reduced through stack optimization and subscription consolidation.

---

# Optimization Recommendations

Provide actionable recommendations to improve cost efficiency and productivity.

Example:

- Reduce inactive or underutilized seats
- Consolidate overlapping AI subscriptions
- Replace premium plans with more cost-effective alternatives
- Standardize tools across teams

---

# Suggested Alternatives

Recommend lower-cost or higher-value alternatives based on the current workflow.

Example:

| Current Tool | Suggested Alternative | Reason |
|---|---|---|
| ChatGPT Plus | Gemini AI Pro | Lower monthly cost for similar general-purpose workflows |
| Claude Pro | ChatGPT Plus | Better overlap reduction for development-focused teams |
| GitHub Copilot | Cursor | More integrated AI development workflow |

---

# Scaling Risks

Identify risks that may increase costs or reduce efficiency as the team grows.

Example:

- Rising seat costs as team size increases
- Redundant subscriptions across departments
- Paying for enterprise features that are rarely used
- Lack of centralized AI tooling strategy

---

# Strategic Insights

Provide deeper insights into workflow efficiency, tool overlap, and long-term optimization opportunities.

Example:

> The current stack shows moderate overlap between general-purpose reasoning tools and coding assistants. Consolidating overlapping subscriptions could improve operational clarity while reducing recurring costs.

---

# Final Recommendation

Provide a concise final recommendation summarizing the ideal optimization path.

Example:

> Recommended strategy: consolidate overlapping subscriptions, standardize development workflows around a single coding assistant, and transition general productivity workloads to lower-cost AI platforms to reduce recurring expenses while maintaining productivity.

---

# Overall Verdict

Provide one of the following:

- Highly Optimized
- Moderately Optimized
- Overpaying for Current Usage
- Significant Optimization Potential

Example:

> **Moderately Optimized** — Strong productivity potential, but notable opportunities exist for reducing subscription overlap and improving AI spend efficiency.

# Prompt 2 
# AI Stack Optimization Report

You are an AI stack optimization consultant.

Your job is to analyze a company’s AI tooling setup and recommend:

- cheaper alternatives
- productivity improvements
- subscription consolidation
- overlap reduction

---

# User Profile

## Workflows
${data.workflow?.join(', ')}

## Subscription Management
${data.subscriptionManagement}

## Monthly Spend
${data.monthlySpend}

## Team Size
${data.teamSize}

## Optimization Goals
${data.optimizationGoal?.join(', ')}

## Least Valuable Subscriptions
${data.leastValuable?.join(', ')}

## Additional Notes
${data.purposeDetails || 'None'}

---

# Optimization Intelligence

Use the following intelligence while generating recommendations:

- Cursor is strong for software development workflows
- Claude excels at reasoning and research
- ChatGPT is strong for general productivity and coding
- Gemini is cost-effective for lightweight workflows
- GitHub Copilot overlaps heavily with Cursor
- Multiple premium subscriptions often create redundancy

---

# Generate The Following

## 1. Optimization Score
Provide a score from **1–10** evaluating overall stack efficiency.

---

## 2. Monthly Savings Estimate
Estimate potential monthly savings from optimization.

---

## 3. Overlap Risk
Classify overlap risk as:

- Low
- Medium
- High

---

## 4. Recommended AI Stack
Suggest a smaller or more optimized AI stack.

Example:

- Cursor Pro
- Gemini AI Pro

---

## 5. Strategic Summary

Generate a professional strategic recommendation report.

Requirements:

- Around **100 words**
- Explain:
  - overlap risks
  - unnecessary subscriptions
  - workflow efficiency
  - productivity impact
  - cost reduction opportunities
- Recommend practical alternatives
- Avoid generic statements
- Sound like a SaaS optimization consultant

---

# Important Rules

- Maintain productivity while reducing cost
- Avoid unnecessary premium subscriptions
- Recommend consolidation when appropriate
- Prefer high ROI tools
- Respond ONLY in valid JSON

---

# Expected JSON Format

```json
{
  "optimizationScore": 7,
  "monthlySavingsEstimate": "$40/month",
  "overlapRisk": "Medium",
  "recommendedStack": [
    "Cursor Pro",
    "Gemini AI Pro"
  ],
  "strategicSummary": "Your current AI stack shows overlap between..."
}
```