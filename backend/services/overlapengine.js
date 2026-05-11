const overlapEngine = (
  data
) => {

  let overlapRisk = 'Low'

  let overlapFindings = []

  const workflows =
    data.workflow || []

  const painPoints =
    data.painPoints || []

  // User-reported overlap

  if (
    painPoints.includes(
      'Overlapping subscriptions'
    )
  ) {

    overlapRisk = 'High'

    overlapFindings.push(
      'Your team reported overlapping subscriptions across multiple AI tools.'
    )
  }

  // Dev overlap

  if (
    workflows.includes(
      'Software Development'
    )
  ) {

    overlapRisk = 'Medium'

    overlapFindings.push(
      'Development-focused workflows may overlap across Cursor, GitHub Copilot, and ChatGPT.'
    )
  }

  // Research overlap

  if (
    workflows.includes(
      'Content & Research'
    )
  ) {

    overlapFindings.push(
      'Reasoning and research workflows may overlap between Claude and ChatGPT.'
    )
  }

  // Productivity overlap

  if (
    workflows.includes(
      'General Productivity'
    ) ||
    workflows.includes(
      'Business Operations'
    )
  ) {

    overlapFindings.push(
      'General productivity workflows can often be consolidated into lower-cost AI platforms.'
    )
  }

  // Fallback

  if (
    overlapFindings.length === 0
  ) {

    overlapFindings.push(
      'No major overlap risks detected in your current AI stack.'
    )
  }

  return {

    overlapRisk,

    overlapFindings,
  }
}

module.exports = overlapEngine