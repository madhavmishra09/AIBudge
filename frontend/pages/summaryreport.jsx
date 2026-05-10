import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SummaryReport() {

  const location = useLocation()

  const [isDownloading, setIsDownloading] =
    useState(false)

  const reportData =
    location.state?.responses

  const audit =
    location.state?.audit

  if (!reportData) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-purple-50 px-4">

        <div className="rounded-3xl border border-purple-200 bg-white p-10 shadow-xl text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            No Audit Data Found
          </h1>

          <p className="mt-4 text-gray-600">
            Please complete the AI audit first.
          </p>

          <Link
            to="/spend-input"
            className="mt-6 inline-flex rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Start Audit
          </Link>

        </div>

      </div>

    )
  }

  const budgetMap = {
    '$0–100': 50,
    '$100–500': 300,
    '$500–1K': 750,
    '$1K+': 1500,
  }

  const teamMap = {
    '1–5': 3,
    '6–20': 13,
    '21–50': 35,
    '50+': 75,
  }

  const currentSpend =
    budgetMap[reportData.monthlySpend] || 0

  const estimatedSavings =
    audit?.monthlySavingsEstimate ||
    `$${Math.round(currentSpend * 0.25)}/month`

  const annualSavings =
    Math.round(currentSpend * 0.25) * 12

  const teamCount =
    teamMap[reportData.teamSize] || 1

  const overlapRisk =
    audit?.overlapRisk || 'Low'

  const optimizationScore =
    audit?.optimizationScore || 7

  const downloadPDF = async () => {

    setIsDownloading(true)

    try {

      const { html2pdf } = window

      if (!html2pdf) {

        alert(
          'PDF library still loading. Please try again.'
        )

        setIsDownloading(false)

        return
      }

      const reportElement =
        document.getElementById('pdf-report')

      const options = {
        margin: 15,
        filename: 'aibudge-report.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
        },
        jsPDF: {
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        },
      }

      html2pdf()
        .set(options)
        .from(reportElement)
        .save()

    } catch (error) {

      console.error(error)

      alert('Failed to generate PDF.')

    } finally {

      setIsDownloading(false)

    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
              AI OPTIMIZATION REPORT
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Your AI Stack Analysis
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              We analyzed your AI workflows, optimization goals,
              and subscription patterns to identify opportunities
              for cost reduction and productivity improvements.
            </p>

          </div>

          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-purple-400/40 disabled:opacity-70"
          >

            {isDownloading
              ? 'Generating PDF...'
              : 'Download PDF'}

          </button>

        </div>

        {/* Main Report */}

        <div
          id="pdf-report"
          className="space-y-8"
        >

          {/* Metrics */}

          <div className="grid gap-4 md:grid-cols-4">

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                Estimated Monthly Savings
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {estimatedSavings}
              </p>

            </div>

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                Annual Savings Potential
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                ${annualSavings}
              </p>

            </div>

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                Optimization Score
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {optimizationScore}/10
              </p>

            </div>

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                Overlap Risk
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {overlapRisk}
              </p>

            </div>

          </div>

          {/* AI Summary */}

          <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
              AI Strategic Analysis
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Optimization Recommendations
            </h2>

            <p className="mt-6 leading-8 text-gray-700">

              {audit?.strategicSummary ||

                `Your current AI stack shows moderate optimization potential.
                Several overlapping subscriptions may be increasing recurring costs
                without providing proportional productivity gains. Consolidating
                overlapping tools and standardizing workflows across your organization
                could significantly reduce AI spend while maintaining operational
                efficiency. Lower-cost alternatives may provide similar capabilities
                for research, general productivity, and development workflows.
                Optimizing your current stack can improve visibility, reduce redundancy,
                and simplify long-term scaling.`}

            </p>

          </div>

          {/* Recommended Stack */}

          <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold text-gray-900">
              Recommended AI Stack
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">

              {audit?.recommendedStack?.length > 0 ? (

                audit.recommendedStack.map((tool) => (

                  <div
                    key={tool}
                    className="rounded-full bg-purple-100 px-5 py-3 text-sm font-semibold text-purple-800"
                  >
                    {tool}
                  </div>

                ))

              ) : (

                <>
                  <div className="rounded-full bg-purple-100 px-5 py-3 text-sm font-semibold text-purple-800">
                    Cursor Pro
                  </div>

                  <div className="rounded-full bg-purple-100 px-5 py-3 text-sm font-semibold text-purple-800">
                    Gemini AI Pro
                  </div>
                </>

              )}

            </div>

          </div>

          {/* Stack Overview */}

          <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold text-gray-900">
              AI Stack Overview
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Workflows
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">

                  {Array.isArray(reportData.workflow)
                    ? reportData.workflow.join(', ')
                    : reportData.workflow}

                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Subscription Management
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {reportData.subscriptionManagement}
                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Monthly AI Spend
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {reportData.monthlySpend}
                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Team Size
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {reportData.teamSize}
                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Optimization Goals
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">

                  {Array.isArray(reportData.optimizationGoal)
                    ? reportData.optimizationGoal.join(', ')
                    : reportData.optimizationGoal}

                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Least Valuable Subscriptions
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">

                  {Array.isArray(reportData.leastValuable)
                    ? reportData.leastValuable.join(', ')
                    : reportData.leastValuable}

                </p>

              </div>

            </div>

            {reportData.purposeDetails && (

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-600">
                  Additional Notes
                </p>

                <p className="mt-3 text-gray-700">
                  {reportData.purposeDetails}
                </p>

              </div>

            )}

          </div>

          {/* Final CTA */}

          <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 p-8 text-white shadow-lg">

            <p className="text-sm font-semibold uppercase tracking-[0.24em]">
              Final Recommendation
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Your Stack Has Strong Optimization Potential
            </h2>

            <p className="mt-5 max-w-3xl text-purple-100 leading-8">

              Reducing overlapping AI subscriptions and consolidating
              workflows around fewer high-efficiency tools can lower
              recurring costs while preserving productivity. Standardizing
              your AI stack will also improve scalability, simplify team
              onboarding, and reduce operational complexity as adoption grows.

            </p>

          </div>

        </div>

        {/* Bottom Actions */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/spend-input"
            className="rounded-2xl border border-purple-300 bg-white px-6 py-3 text-center text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
          >
            Start New Audit
          </Link>

          <Link
            to="/"
            className="rounded-2xl bg-purple-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Back to Home
          </Link>

        </div>

      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

    </div>
  )
}