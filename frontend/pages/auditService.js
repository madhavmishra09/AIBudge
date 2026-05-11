const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000'

export const generateAudit = async (
  responses
) => {

  const response =
    await fetch(
      `${API_BASE}/api/audit/analyze`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(
          responses
        ),
      }
    )

  if (!response.ok) {

    const errorData =
      await response.json()

    console.error(
      errorData
    )

    throw new Error(
      errorData?.error ||
      'Audit generation failed'
    )
  }

  return response.json()
}