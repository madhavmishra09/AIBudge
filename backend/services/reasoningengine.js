const toolKnowledge = require('../data/toolKnowledge')

const reasoningEngine = (data) => {

  const workflows = data.workflow || []

  const leastValuable =
    data.leastValuable || []

  let overlapDetected = false

  let overlapReasons = []

  let optimizationScore = 10

  let recommendations = []

  let suggestedStack = []

  let estimatedSavings = 0

  // Detect overlap

  if (
    leastValuable.includes('Cursor') &&
    leastValuable.includes('GitHub Copilot')
  ) {

    overlapDetected = true

    overlapReasons.push(
      'Cursor and GitHub Copilot overlap heavily in coding workflows.'
    )

    optimizationScore -= 2

    estimatedSavings += 20
  }

  if (
    leastValuable.includes('Claude') &&
    leastValuable.includes('ChatGPT')
  ) {

    overlapDetected = true

    overlapReasons.push(
      'Claude and ChatGPT overlap in reasoning and productivity workflows.'
    )

    optimizationScore -= 2

    estimatedSavings += 20
  }

  // Workflow logic

  if (
    workflows.includes('Software Development')
  ) {

    suggestedStack.push('Cursor Pro')

    recommendations.push(
      'Cursor is highly optimized for development workflows.'
    )
  }

  if (
    workflows.includes('General Productivity')
  ) {

    suggestedStack.push('Gemini AI Pro')

    recommendations.push(
      'Gemini AI Pro provides strong value for lightweight productivity workflows.'
    )
  }

  if (
    workflows.includes('Content & Research')
  ) {

    suggestedStack.push('Claude Pro')

    recommendations.push(
      'Claude performs strongly for research-heavy workflows.'
    )
  }

  // Remove duplicates

  suggestedStack = [...new Set(suggestedStack)]

  // Risk

  let overlapRisk = 'Low'

  if (optimizationScore <= 6) {

    overlapRisk = 'High'

  } else if (optimizationScore <= 8) {

    overlapRisk = 'Medium'
  }

  return {

    optimizationScore,

    overlapRisk,

    overlapReasons,

    recommendations,

    suggestedStack,

    estimatedSavings:
      `$${estimatedSavings}/month`,
  }
}

module.exports = reasoningEngine