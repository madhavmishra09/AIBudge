const buildAuditPrompt = (

  data,
  scoring,
  overlap,
  recommendations

) => {

  return `
You are an AI SaaS optimization consultant.

Analyze the following organization's AI tooling setup.

WORKFLOWS:
${data.workflow?.join(', ')}

TEAM SIZE:
${data.teamSize}

MONTHLY SPEND:
${data.monthlySpend}

TEAM SATISFACTION:
${data.teamSatisfaction}

PAIN POINTS:
${data.painPoints?.join(', ')}

HIGHEST COST TOOL:
${data.highestCostTool}

SCORING ENGINE RESULTS:

Optimization Score:
${scoring.score}/10

Findings:
${scoring.findings.join('\n')}

OVERLAP ANALYSIS:

Overlap Risk:
${overlap.overlapRisk}

Overlap Findings:
${overlap.overlapFindings.join('\n')}

RECOMMENDATION ENGINE OUTPUT:

${JSON.stringify(
  recommendations.recommendations,
  null,
  2
)}

IMPORTANT:

Generate a professional AI optimization report.

You MUST:

- explain WHY recommendations are being made
- explain pricing inefficiencies
- explain overlap problems
- explain productivity tradeoffs
- explain expected savings
- sound like a SaaS consultant
- provide realistic optimization insights
- avoid generic statements

Respond ONLY in valid JSON.

Format:

{
  "strategicSummary": "...",
  "tradeoffAnalysis": "...",
  "finalRecommendation": "..."
}
`
}

module.exports =
  buildAuditPrompt