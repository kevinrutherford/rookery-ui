import { post } from './post.server'

export const createCommunity = async (request: Request) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await post('/community', {
    ...updates,
    id: 'local-community',
    overview: updates.overview.toString().split('\n'),
  }, request)
}

