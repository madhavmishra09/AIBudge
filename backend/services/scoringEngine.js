const scoringEngine = (
  data = {}
) => {

  const satisfaction =
    data.teamSatisfaction || ''

  const painPoints =
    data.painPoints || []

  const workflows =
    data.workflow || []

  let score = 10

  let findings = []

  // Satisfaction scoring

  if (
    satisfaction ===
    'Mostly Unsatisfied'
  ) {

    score -= 3

    findings.push(
      'Team satisfaction levels indicate workflow inefficiencies.'
    )
  }

  if (
    satisfaction ===
    'Very Unsatisfied'
  ) {

    score -= 4

    findings.push(
      'Current AI stack shows severe satisfaction issues.'
    )
  }

  // Cost concerns

  if (
    painPoints.includes(
      'Too expensive'
    )
  ) {

    score -= 2

    findings.push(
      'Current AI tooling appears cost inefficient.'
    )
  }

  // Overlap concerns

  if (
    painPoints.includes(
      'Overlapping subscriptions'
    )
  ) {

    score -= 2

    findings.push(
      'Multiple overlapping subscriptions detected.'
    )
  }

  // Workflow complexity

  if (
    workflows.includes(
      'Software Development'
    )
  ) {

    findings.push(
      'Development-centric workflows require stronger optimization focus.'
    )
  }

  // Prevent negative score

  if (score < 1) {

    score = 1
  }

  return {

    score,

    findings,
  }
}

module.exports =
  scoringEngine