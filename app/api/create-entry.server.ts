import { v4 } from 'uuid'

export const createEntry = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: v4(),
    }),
  })
}

