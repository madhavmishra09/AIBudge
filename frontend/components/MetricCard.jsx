export default function MetricCard({

  title,
  value,
  subtitle,

}) {

  return (

    <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">

      <p className="text-xs uppercase tracking-[0.24em] text-purple-500">

        {title}

      </p>

      <h2 className="mt-4 text-4xl font-black text-gray-900">

        {value}

      </h2>

      <p className="mt-3 text-gray-600">

        {subtitle}

      </p>

    </div>
  )
}