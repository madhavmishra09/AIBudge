const buildAuditPrompt = (
  data,
  reasoning
) => {

  return `
You are an AI stack optimization consultant.

Analyze the following AI tooling setup.

User Workflows:
${data.workflow?.join(', ')}

Monthly Spend:
${data.monthlySpend}

Team Size:
${data.teamSize}

Optimization Goals:
${data.optimizationGoal?.join(', ')}

Least Valuable Subscriptions:
${data.leastValuable?.join(', ')}

Reasoning Engine Output:

Optimization Score:
${reasoning.optimizationScore}/10

Overlap Risk:
${reasoning.overlapRisk}

Overlap Reasons:
${reasoning.overlapReasons.join('\n')}

Recommendations:
${reasoning.recommendations.join('\n')}

Suggested Stack:
${reasoning.suggestedStack.join(', ')}

Estimated Savings:
${reasoning.estimatedSavings}

Generate:

1. strategicSummary
2. tradeoffAnalysis
3. finalRecommendation

IMPORTANT:

- strategicSummary must be around 100 words
- explain WHY recommendations are being made
- explain overlap
- explain productivity tradeoffs
- explain cost reduction opportunities
- sound like a SaaS optimization consultant
- avoid generic statements

Respond ONLY in valid JSON.

Example:

{
  "strategicSummary": "Your current AI stack...",
  "tradeoffAnalysis": "Replacing Claude...",
  "finalRecommendation": "Standardize your stack..."
}
`
}

module.exports = buildAuditPrompt