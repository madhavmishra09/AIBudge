import { useEffect, useState } from 'react'

import MetricCard from '../components/MetricCard'
import RecommendationCard from '../components/RecommendationCard'
import CostBreakdownChart from '../components/CostBreakdownChart'
import KeyFindings from '../components/KeyFindings'

export default function SummaryReport() {

  const [audit, setAudit] = useState(null)

  useEffect(() => {

    const storedAudit =
      localStorage.getItem('auditReport')

    if (storedAudit) {

      setAudit(
        JSON.parse(storedAudit)
      )
    }

  }, [])

  if (!audit) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-purple-100">

        <div className="rounded-3xl border border-purple-200 bg-white px-10 py-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-900">

            No Audit Report Found

          </h2>

          <p className="mt-3 text-gray-600">

            Please complete your audit first.

          </p>

        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 px-4 py-12">

      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-500">

              AI Optimization Report

            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">

              Your AI Stack Analysis

            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">

              We analyzed your AI workflows, pricing structure,
              team satisfaction, and optimization opportunities
              to identify cost-saving and productivity improvements.

            </p>

          </div>

          <button
            onClick={() => window.print()}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
          >

            Download PDF

          </button>

        </div>

        {/* Metrics */}

        <div className="grid gap-6 md:grid-cols-4">

          <MetricCard
            title="Estimated Monthly Savings"
            value={
              audit?.monthlySavingsEstimate ||
              '₹0/month'
            }
            subtitle="Potential optimization savings"
          />

          <MetricCard
            title="Optimization Score"
            value={`${audit?.optimizationScore || 0}/10`}
            subtitle="Overall stack efficiency"
          />

          <MetricCard
            title="Overlap Risk"
            value={
              audit?.overlapRisk ||
              'Low'
            }
            subtitle="Subscription redundancy analysis"
          />

          <MetricCard
            title="Recommendations"
            value={
              audit?.recommendations?.length || 0
            }
            subtitle="Optimization opportunities detected"
          />

        </div>

        {/* Key Findings */}

        <KeyFindings
          findings={
            audit?.findings || []
          }
        />

        {/* Strategic Summary */}

        <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">

            Strategic Summary

          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">

            AI Stack Performance Analysis

          </h2>

          <p className="mt-6 leading-8 text-gray-700">

            {audit?.strategicSummary ||

              'Your organization shows moderate optimization potential with opportunities to reduce AI spend while maintaining workflow productivity.'}

          </p>

        </div>

        {/* Cost Graph */}

        <CostBreakdownChart
          recommendations={
            audit?.recommendations || []
          }
        />

        {/* Recommendations */}

        <div className="space-y-8">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-500">

              Recommendations

            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-900">

              Optimization Opportunities

            </h2>

          </div>

          {

            audit?.recommendations?.length > 0

              ? (

                audit.recommendations.map(
                  (
                    recommendation,
                    index
                  ) => (

                    <RecommendationCard
                      key={index}
                      recommendation={
                        recommendation
                      }
                    />

                  )
                )

              )

              : (

                <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

                  <p className="text-gray-700">

                    No major optimization opportunities detected.

                  </p>

                </div>

              )

          }

        </div>

        {/* Overlap Analysis */}

        <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">

            Overlap Analysis

          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">

            Subscription Redundancy Review

          </h2>

          <div className="mt-8 space-y-4">

            {

              audit?.overlapFindings?.length > 0

                ? (

                  audit.overlapFindings.map(
                    (
                      finding,
                      index
                    ) => (

                      <div
                        key={index}
                        className="rounded-2xl border border-purple-100 bg-purple-50 p-5"
                      >

                        <p className="leading-8 text-gray-700">

                          {finding}

                        </p>

                      </div>

                    )
                  )

                )

                : (

                  <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">

                    <p className="leading-8 text-gray-700">

                      No significant overlap risks detected.

                    </p>

                  </div>

                )

            }

          </div>

        </div>

        {/* Tradeoff Analysis */}

        <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">

            Tradeoff Analysis

          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">

            Productivity vs Cost Evaluation

          </h2>

          <p className="mt-6 leading-8 text-gray-700">

            {audit?.tradeoffAnalysis ||

              'Reducing overlapping AI subscriptions may slightly reduce access to advanced premium features, but overall productivity impact is expected to remain low for your workflows.'}

          </p>

        </div>

        {/* Final Recommendation */}

        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 p-10 text-white shadow-2xl">

          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-100">

            Final Recommendation

          </p>

          <h2 className="mt-4 text-4xl font-black">

            Recommended Optimization Strategy

          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-purple-100">

            {audit?.finalRecommendation ||

              'Consolidating overlapping subscriptions and standardizing workflows around fewer high-efficiency AI tools can significantly reduce recurring costs while maintaining team productivity.'}

          </p>

        </div>

      </div>

    </div>
  )
}