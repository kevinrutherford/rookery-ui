export const createCommunity = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/community', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: 'local-community',
      overview: updates.overview.toString().split('\n'),
    }),
  })
}

