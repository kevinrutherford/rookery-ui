import { v4 } from 'uuid'

export const createComment = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: v4(),
    }),
  })
}

