const toolMatrix =
  require('../data/toolMatrix')

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

  const optimizationGoals =
    data.optimizationGoal || []

  const teamSize =
    data.teamSize

  let recommendations = []

  let totalSavings = 0

  const currentTool =
    toolMatrix[highestCostTool]

  if (!currentTool) {

    return {

      recommendations: [],

      totalSavings:
        '₹0/month',
    }
  }

  // Current workflow coverage

  let currentCoverage = 0

  workflows.forEach(
    (workflow) => {

      currentCoverage +=
        currentTool.workflows[
          workflow
        ] || 0
    }
  )

  // Compare alternatives

  Object.keys(toolMatrix).forEach(
    (toolName) => {

      if (
        toolName ===
        highestCostTool
      ) return

      const tool =
        toolMatrix[toolName]

      // Alternative workflow coverage

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

      let reasoning = []

      // Coverage analysis

      if (
        alternativeCoverage >=
        currentCoverage
      ) {

        recommendationScore += 4

        reasoning.push(
          `${toolName} provides equal or stronger workflow coverage for your selected use cases.`
        )

      } else if (
        alternativeCoverage >=
        currentCoverage - 2
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} maintains similar productivity coverage with minimal workflow tradeoffs.`
        )
      }

      // Cost efficiency

      if (savings > 0) {

        recommendationScore += 3

        reasoning.push(
          `${toolName} reduces recurring AI spend by approximately ₹${savings}/month.`
        )
      }

      // Satisfaction analysis

      if (
        satisfaction ===
          'Mostly Unsatisfied' ||
        satisfaction ===
          'Very Unsatisfied'
      ) {

        recommendationScore += 2

        reasoning.push(
          'Your current stack shows low satisfaction signals, suggesting optimization opportunities.'
        )
      }

      // Pain point analysis

      if (
        painPoints.includes(
          'Too expensive'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          'Cost concerns indicate strong potential for subscription optimization.'
        )
      }

      if (
        painPoints.includes(
          'Overlapping subscriptions'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} can help consolidate overlapping workflow capabilities.`
        )
      }

      // Optimization goals

      if (
        optimizationGoals.includes(
          'Reduce unnecessary AI spending'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} aligns strongly with your cost-reduction goals.`
        )
      }

      if (
        optimizationGoals.includes(
          'Improve developer productivity'
        ) &&
        tool.strengths.includes(
          'agentic coding'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} offers stronger developer workflow integration and coding efficiency.`
        )
      }

      // Scaling risk

      if (
        (
          teamSize === '21–50' ||
          teamSize === '50+'
        ) &&
        currentTool.scalingRisk ===
          'High'
      ) {

        recommendationScore += 2

        reasoning.push(
          'Your current tooling may introduce scaling inefficiencies as team adoption increases.'
        )
      }

      // Only recommend GOOD alternatives

      if (
        recommendationScore >= 6
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

          recommendationScore,

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

          whyBetter:
            reasoning.join(' '),

          tradeoff:
            alternativeCoverage >=
              currentCoverage
              ? 'Minimal workflow tradeoffs expected.'
              : 'Some advanced premium capabilities may be reduced depending on workflow complexity.',

          strategicFit:
            `${toolName} aligns well with your organization's optimization priorities and workflow requirements.`,
        })
      }
    }
  )

  // Sort strongest recommendations first

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