import { post } from './post.server'

export const createCollection = async (request: Request) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await post('/collections', {
    ...updates,
    id: updates.handle,
  }, request)
}

