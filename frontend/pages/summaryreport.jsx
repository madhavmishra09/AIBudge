import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SummaryReport() {
  const location = useLocation()
  const [isDownloading, setIsDownloading] = useState(false)
  
  const reportData = location.state?.responses || {
    aiTool: 'Not specified',
    toolType: 'Not specified',
    billingFrequency: 'Not specified',
    monthlyBudget: 'Not specified',
    teamSize: 'Not specified',
    purpose: 'Not specified',
    purposeDetails: '',
  }

  const calculateSavingsEstimate = () => {
    const budgetMap = {
      '$0–100': 50,
      '$100–500': 300,
      '$500–1K': 750,
      '$1K+': 1500,
    }
    const baseSpend = budgetMap[reportData.monthlyBudget] || 0
    return Math.round(baseSpend * 0.25)
  }

  const teamMap = {
    '1–5': 3,
    '6–20': 13,
    '21–50': 35,
    '50+': 75,
  }
  const teamCount = teamMap[reportData.teamSize] || 1
  const savingsPerMonth = calculateSavingsEstimate()
  const savingsPerYear = savingsPerMonth * 12

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      const { html2pdf } = window
      if (!html2pdf) {
        alert('PDF library is loading. Please try again in a moment.')
        setIsDownloading(false)
        return
      }

      const reportElement = document.getElementById('pdf-report')
      const opt = {
        margin: 15,
        filename: 'aibudge-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      }

      html2pdf().set(opt).from(reportElement).save()
    } catch (error) {
      console.error('PDF download error:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header with Download Button */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Your AI Spend Audit Report</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">Optimization Summary</h1>
          </div>
          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:bg-purple-400"
          >
            {isDownloading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* Main Report Content */}
        <div id="pdf-report" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Estimated Monthly Savings</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">${savingsPerMonth}</p>
              <p className="mt-1 text-sm text-gray-600">{savingsPerMonth ? 'Based on your current spend' : 'More info needed'}</p>
            </div>

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Annual Savings Potential</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">${savingsPerYear}</p>
              <p className="mt-1 text-sm text-gray-600">At 25% optimization rate</p>
            </div>

            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Team Impact</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">×{teamCount}</p>
              <p className="mt-1 text-sm text-gray-600">Users optimized</p>
            </div>
          </div>

          {/* Your Answers */}
          <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">Your Responses</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Primary AI Tool</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.aiTool}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Tool Category</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.toolType}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Billing Frequency</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.billingFrequency}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Monthly AI Spend</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.monthlyBudget}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Team Size</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.teamSize}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Main Purpose</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{reportData.purpose}</p>
              </div>
            </div>

            {reportData.purposeDetails && (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-600">Your Custom Goal</p>
                <p className="mt-2 text-gray-700">{reportData.purposeDetails}</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">Next Steps</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Review your stack</h3>
                  <p className="mt-1 text-gray-600">
                    We identified your primary tool as <strong>{reportData.aiTool}</strong>. Compare it against alternatives that match your {reportData.purpose.toLowerCase()} needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Calculate team impact</h3>
                  <p className="mt-1 text-gray-600">
                    With {teamCount} team members on your stack, a 25% optimization could save approximately <strong>${savingsPerYear}/year</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get personalized recommendations</h3>
                  <p className="mt-1 text-gray-600">
                    Share this report to unlock premium recommendations tailored to your <strong>{reportData.toolType}</strong> use case.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              This report is based on your responses and public pricing data. Actual savings may vary based on your specific usage patterns and contract terms.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
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

      {/* Load html2pdf library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    </div>
  )
}
