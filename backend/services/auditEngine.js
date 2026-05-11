const scoringEngine =
  require('./scoringEngine')

const recommendationEngine =
  require('./recommendationEngine')

const overlapEngine =
  require('./overlapengine')

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

  // STEP 4 — Clean recommendation objects

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

  // STEP 5 — Static AI narrative layer
  // (Production-safe replacement for Ollama)

  const strategicSummary =

    `Your organization shows optimization opportunities across pricing efficiency, workflow consolidation, and AI workflow standardization. Current tooling indicates potential overlap across subscriptions while maintaining moderate productivity coverage for your selected workflows.`

  const tradeoffAnalysis =

    cleanedRecommendations
      ?.map(
        (r) => r.tradeoff
      )
      .join(' ')

    ||

    `Reducing overlapping subscriptions may slightly reduce access to certain premium capabilities, but overall workflow productivity impact is expected to remain low.`

  const finalRecommendation =

    `Potential savings of ${recommendations.totalSavings} detected through AI subscription consolidation, workflow optimization, and improved tool standardization across your organization.`

  // STEP 6 — Return final audit object

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

    // Narrative layer

    strategicSummary,

    tradeoffAnalysis,

    finalRecommendation,
  }
}

module.exports =
  generateAudit