export const createCollection = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      ...updates,
      id: updates.handle,
    }),
  })
}

