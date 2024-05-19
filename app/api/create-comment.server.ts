import { v4 } from 'uuid'
import { post } from './post.server'

export const createComment = async (request: Request) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await post('/comments', {
    ...updates,
    id: v4(),
  }, request)
}

