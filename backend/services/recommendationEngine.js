const toolMatrix =
  require('../data/toolMatrix')

const recommendationEngine = (
  data = {}
) => {

  // SAFE INPUT NORMALIZATION

  const workflows =
    Array.isArray(
      data?.workflow
    )
      ? data.workflow
      : []

  const satisfaction =
    data?.teamSatisfaction || ''

  const painPoints =
    Array.isArray(
      data?.painPoints
    )
      ? data.painPoints
      : []

  const highestCostTool =
    data?.highestCostTool || ''

  const optimizationGoals =
    Array.isArray(
      data?.optimizationGoal
    )
      ? data.optimizationGoal
      : []

  const teamSize =
    data?.teamSize || ''

  let recommendations = []

  let totalSavings = 0

  // SAFE TOOL LOOKUP

  const currentTool =
    toolMatrix?.[
      highestCostTool
    ]

  // RETURN EARLY IF TOOL NOT FOUND

  if (!currentTool) {

    return {

      recommendations: [],

      totalSavings:
        '₹0/month',
    }
  }

  // CURRENT WORKFLOW COVERAGE

  let currentCoverage = 0

  workflows.forEach(
    (workflow) => {

      currentCoverage +=
        currentTool?.workflows?.[
          workflow
        ] || 0
    }
  )

  // COMPARE ALTERNATIVES

  Object.keys(
    toolMatrix || {}
  ).forEach(
    (toolName) => {

      // SKIP CURRENT TOOL

      if (
        toolName ===
        highestCostTool
      ) return

      const tool =
        toolMatrix?.[
          toolName
        ]

      if (!tool) return

      // ALTERNATIVE COVERAGE

      let alternativeCoverage = 0

      workflows.forEach(
        (workflow) => {

          alternativeCoverage +=
            tool?.workflows?.[
              workflow
            ] || 0
        }
      )

      // SAFE PRICING

      const currentPrice =

        currentTool?.pricing

          ? Object.values(
              currentTool.pricing
            )[0]

          : 0

      const alternativePrice =

        tool?.pricing

          ? Object.values(
              tool.pricing
            )[0]

          : 0

      const savings =
        currentPrice -
        alternativePrice

      // RECOMMENDATION SCORE

      let recommendationScore = 0

      let reasoning = []

      // COVERAGE ANALYSIS

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

      // COST EFFICIENCY

      if (savings > 0) {

        recommendationScore += 3

        reasoning.push(
          `${toolName} reduces recurring AI spend by approximately ₹${savings}/month.`
        )
      }

      // SATISFACTION ANALYSIS

      if (
        satisfaction ===
          'Mostly Unsatisfied' ||

        satisfaction ===
          'Very Unsatisfied'
      ) {

        recommendationScore += 2

        reasoning.push(
          'Current satisfaction levels indicate optimization opportunities.'
        )
      }

      // PAIN POINT ANALYSIS

      if (
        painPoints.includes(
          'Too expensive'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          'Cost concerns indicate strong potential for AI spend optimization.'
        )
      }

      if (
        painPoints.includes(
          'Overlapping subscriptions'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} may help consolidate overlapping AI workflow capabilities.`
        )
      }

      // OPTIMIZATION GOALS

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

        tool?.strengths?.includes(
          'agentic coding'
        )
      ) {

        recommendationScore += 2

        reasoning.push(
          `${toolName} offers stronger coding workflow integration and developer productivity support.`
        )
      }

      // SCALING RISK

      if (
        (
          teamSize === '21-50' ||

          teamSize === '50+'
        ) &&

        currentTool?.scalingRisk ===
          'High'
      ) {

        recommendationScore += 2

        reasoning.push(
          'Current tooling may introduce scaling inefficiencies as team adoption increases.'
        )
      }

      // ONLY RECOMMEND STRONG OPTIONS

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
            `${toolName} aligns well with your optimization priorities and workflow requirements.`,
        })
      }
    }
  )

  // SAFE SORT

  if (
    recommendations.length > 0
  ) {

    recommendations.sort(
      (a, b) =>
        b.recommendationScore -
        a.recommendationScore
    )
  }

  return {

    recommendations,

    totalSavings:
      `₹${totalSavings}/month`,
  }
}

module.exports =
  recommendationEngine