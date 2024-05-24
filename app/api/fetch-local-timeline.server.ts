import { get } from './get.server'

export const fetchLocalTimeline = async (request: Request) => {
  const response = await get('/timelines/local', request)
  return await response.json()
}

