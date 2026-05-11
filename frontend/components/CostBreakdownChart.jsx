import {

  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,

} from 'recharts'

export default function CostBreakdownChart({

  recommendations,

}) {

  const data =
    recommendations?.map(
      (item) => ({

        name:
          item.currentTool,

        value:
          parseInt(
            item.currentMonthlyCost
              ?.replace(/[₹,]/g, '')
          ) || 0,
      })
    )

  return (

    <div className="rounded-3xl border border-purple-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-semibold text-gray-900">

        Current AI Spend Distribution

      </h2>

      <div className="mt-8 h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >

              {data?.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}