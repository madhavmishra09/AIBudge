export default function RecommendationCard({

  recommendation,

}) {

  return (

    <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

      <div className="flex flex-wrap items-center gap-3">

        <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

          {recommendation.currentTool}

        </div>

        <span className="text-gray-400">
          →
        </span>

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

          {recommendation.recommendedTool}

        </div>

      </div>

      <p className="mt-6 leading-8 text-gray-700">

        {recommendation.whyBetter}

      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-purple-50 p-5">

          <p className="text-xs uppercase tracking-[0.24em] text-purple-500">

            Current Cost

          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">

            {recommendation.currentMonthlyCost}

          </h3>

        </div>

        <div className="rounded-2xl bg-purple-50 p-5">

          <p className="text-xs uppercase tracking-[0.24em] text-purple-500">

            Optimized Cost

          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">

            {recommendation.optimizedMonthlyCost}

          </h3>

        </div>

        <div className="rounded-2xl bg-green-50 p-5">

          <p className="text-xs uppercase tracking-[0.24em] text-green-600">

            Estimated Savings

          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-700">

            {recommendation.estimatedSavings}

          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-purple-100 bg-purple-50 p-5">

        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">

          Tradeoff Analysis

        </p>

        <p className="mt-3 leading-8 text-gray-700">

          {
            typeof recommendation.tradeoff ===
              'object'

              ? JSON.stringify(
                recommendation.tradeoff,
                null,
                2
              )

              : recommendation.tradeoff
          }

        </p>

      </div>

    </div>
  )
}