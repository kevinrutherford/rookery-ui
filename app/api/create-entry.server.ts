import { v4 } from 'uuid'
import { post } from './post.server'

export const createEntry = async (formData: FormData) => {
  const updates = Object.fromEntries(formData)
  await post('/entries', {
    ...updates,
    id: v4(),
  })
}

