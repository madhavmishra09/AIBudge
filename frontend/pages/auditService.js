export const generateAudit = async (responses) => {

  const response = await fetch(
    'http://localhost:5000/api/audit/analyze',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responses),
    }
  )

  if (!response.ok) {
    throw new Error('Audit generation failed')
  }

  return response.json()
}