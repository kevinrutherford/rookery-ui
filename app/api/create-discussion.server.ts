import { v4 } from 'uuid'
import { post } from './post.server'

export const createDiscussion = async (formData: FormData, request: Request) => {
  const updates = Object.fromEntries(formData)
  await post('/discussions', {
    ...updates,
    id: v4(),
  }, request)
}

