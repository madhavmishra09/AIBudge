const axios = require('axios')

const scoringEngine =
  require('./scoringEngine')

const recommendationEngine =
  require('./recommendationEngine')

const overlapEngine =
  require('./overlapengine')

const buildAuditPrompt =
  require('../prompts/auditPrompt')

const generateAudit = async (
  data
) => {

  // STEP 1 — Run scoring engine

  const scoring =
    scoringEngine(data)

  // STEP 2 — Run overlap analysis

  const overlap =
    overlapEngine(data)

  // STEP 3 — Generate recommendations

  const recommendations =
    recommendationEngine(data)

  // STEP 4 — Build AI prompt

  const prompt =
    buildAuditPrompt(
      data,
      scoring,
      overlap,
      recommendations
    )

  // STEP 5 — Ask Ollama

  const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || 'http://localhost:11434'

const groqResponse = await axios.post(
  'https://api.groq.com/openai/v1/chat/completions',
  {
    model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI SaaS spend optimization analyst. Return only valid JSON. Do not use markdown.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    timeout: 120000,
  }
)


  // STEP 6 — Parse AI response

  let parsedAI = {}

  try {

    let cleanedResponse =
      groqResponse.data.choices[0].message.content

    // Remove markdown wrappers

    cleanedResponse =
      cleanedResponse.replace(
        /```json/g,
        ''
      )

    cleanedResponse =
      cleanedResponse.replace(
        /```/g,
        ''
      )

    cleanedResponse =
      cleanedResponse.trim()

    parsedAI =
      JSON.parse(
        cleanedResponse
      )

  } catch (error) {

    console.error(
      'JSON Parse Error:',
      error
    )

    parsedAI = {

      strategicSummary:
        'Your AI stack shows optimization opportunities across pricing efficiency, workflow consolidation, and subscription management.',

      tradeoffAnalysis:
        'Reducing overlapping subscriptions may slightly reduce access to some premium capabilities, but overall workflow productivity impact is expected to remain low.',

      finalRecommendation:
        'Potential savings detected through subscription consolidation and workflow optimization.',
    }
  }

  // STEP 7 — Clean recommendation objects

  const cleanedRecommendations =
    recommendations.recommendations.map(
      (rec) => ({

        ...rec,

        whyBetter:
          typeof rec.whyBetter ===
          'object'

            ? JSON.stringify(
                rec.whyBetter
              )

            : rec.whyBetter,

        tradeoff:
          typeof rec.tradeoff ===
          'object'

            ? JSON.stringify(
                rec.tradeoff
              )

            : rec.tradeoff,

        strategicFit:
          typeof rec.strategicFit ===
          'object'

            ? JSON.stringify(
                rec.strategicFit
              )

            : rec.strategicFit,
      })
    )

  // STEP 8 — Return final audit object

  return {

    // Core scoring

    optimizationScore:
      scoring.score,

    findings:
      scoring.findings,

    // Overlap analysis

    overlapRisk:
      overlap.overlapRisk,

    overlapFindings:
      overlap.overlapFindings,

    // Recommendations

    recommendations:
      cleanedRecommendations,

    monthlySavingsEstimate:
      recommendations.totalSavings,

    // AI narrative layer

    strategicSummary:

      parsedAI.strategicSummary ||

      'Your AI stack shows moderate optimization opportunities.',

    tradeoffAnalysis:

      parsedAI.tradeoffAnalysis ||

      cleanedRecommendations
        ?.map(
          (r) => r.tradeoff
        )
        .join(' '),

    finalRecommendation:

      parsedAI.finalRecommendation ||

      `Potential savings of ${recommendations.totalSavings} detected through workflow optimization and subscription consolidation.`,
  }
}

module.exports =
  generateAudit