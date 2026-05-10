const axios = require('axios')

const reasoningEngine =
  require('./reasoningengine')

const buildAuditPrompt =
  require('../prompts/auditPrompt')

const generateAudit = async (data) => {

  // Rule-based reasoning

  const reasoning =
    reasoningEngine(data)

  // Build prompt

  const prompt =
    buildAuditPrompt(
      data,
      reasoning
    )

  // Ask Mistral

  const response =
    await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'mistral',

        prompt,

        stream: false,
      }
    )

  const rawOutput =
    response.data.response

  let parsedAI = {}

  try {

    parsedAI =
      JSON.parse(rawOutput)

  } catch (error) {

    parsedAI = {
      strategicSummary:
        rawOutput,
    }
  }

  // Merge deterministic + AI

  return {

    optimizationScore:
      reasoning.optimizationScore,

    overlapRisk:
      reasoning.overlapRisk,

    monthlySavingsEstimate:
      reasoning.estimatedSavings,

    recommendedStack:
      reasoning.suggestedStack,

    overlapReasons:
      reasoning.overlapReasons,

    recommendations:
      reasoning.recommendations,

    strategicSummary:
      parsedAI.strategicSummary,

    tradeoffAnalysis:
      parsedAI.tradeoffAnalysis,

    finalRecommendation:
      parsedAI.finalRecommendation,
  }
}

module.exports = generateAudit