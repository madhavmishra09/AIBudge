export default function KeyFindings({

  findings,

}) {

  return (

    <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-8">

      <h2 className="text-2xl font-semibold text-gray-900">

        Key Findings

      </h2>

      <ul className="mt-6 space-y-4">

        {findings?.map(
          (
            finding,
            index
          ) => (

            <li
              key={index}
              className="flex items-start gap-3"
            >

              <span>
                ⚠️
              </span>

              <p className="text-gray-700">

                {finding}

              </p>

            </li>
          )
        )}

      </ul>

    </div>
  )
}