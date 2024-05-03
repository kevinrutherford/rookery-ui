import { post } from './post.server'

export const createCollection = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await post('/collections', {
    ...updates,
    id: updates.handle,
  })
}

