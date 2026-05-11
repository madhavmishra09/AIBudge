const toolMatrix =  require('../data/toolMatrix')

const recommendationEngine = (
  data
) => {

  const workflows =
    data.workflow || []

  const satisfaction =
    data.teamSatisfaction

  const painPoints =
    data.painPoints || []

  const highestCostTool =
    data.highestCostTool

  let recommendations = []

  let totalSavings = 0

  // Analyze current expensive tool

  const currentTool =
    toolMatrix[highestCostTool]

  if (!currentTool) {

    return {
      recommendations: [],
      totalSavings: '₹0/month',
    }
  }

  // Calculate workflow coverage

  let currentCoverage = 0

  workflows.forEach((workflow) => {

    currentCoverage +=
      currentTool.workflows[
        workflow
      ] || 0
  })

  // Compare against alternatives

  Object.keys(toolMatrix).forEach(
    (toolName) => {

      if (
        toolName === highestCostTool
      ) return

      const tool =
        toolMatrix[toolName]

      let alternativeCoverage = 0

      workflows.forEach(
        (workflow) => {

          alternativeCoverage +=
            tool.workflows[
              workflow
            ] || 0
        }
      )

      // Pricing

      const currentPrice =
        Object.values(
          currentTool.pricing
        )[0]

      const alternativePrice =
        Object.values(
          tool.pricing
        )[0]

      const savings =
        currentPrice -
        alternativePrice

      // Recommendation Score

      let recommendationScore = 0

      // Coverage efficiency

      if (
        alternativeCoverage >=
        currentCoverage - 2
      ) {

        recommendationScore += 3
      }

      // Cost efficiency

      if (savings > 0) {

        recommendationScore += 3
      }

      // Satisfaction

      if (
        satisfaction ===
          'Mostly Unsatisfied' ||
        satisfaction ===
          'Very Unsatisfied'
      ) {

        recommendationScore += 2
      }

      // Pain points

      if (
        painPoints.includes(
          'Too expensive'
        )
      ) {

        recommendationScore += 2
      }

      // Only recommend good alternatives

      if (
        recommendationScore >= 5
      ) {

        totalSavings += Math.max(
          savings,
          0
        )

        recommendations.push({

          currentTool:
            highestCostTool,

          recommendedTool:
            toolName,

          currentCoverage,

          alternativeCoverage,

          currentMonthlyCost:
            `₹${currentPrice}`,

          optimizedMonthlyCost:
            `₹${alternativePrice}`,

          estimatedSavings:
            savings > 0
              ? `₹${savings}/month`
              : 'Minimal',

          productivityImpact:
            alternativeCoverage >=
            currentCoverage
              ? 'Positive'
              : 'Low',

          recommendationScore,

          whyBetter:
            `${toolName} provides better cost-to-productivity efficiency for your selected workflows.`,

          tradeoff:
            alternativeCoverage >=
            currentCoverage
              ? 'Minimal workflow tradeoffs expected.'
              : 'Some advanced capabilities may be reduced.',
        })
      }
    }
  )

  // Sort best recommendations first

  recommendations.sort(
    (a, b) =>
      b.recommendationScore -
      a.recommendationScore
  )

  return {

    recommendations,

    totalSavings:
      `₹${totalSavings}/month`,
  }
}

module.exports =
  recommendationEngine