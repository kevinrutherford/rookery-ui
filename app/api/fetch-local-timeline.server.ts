import { get } from './get.server'

export const fetchLocalTimeline = async () => {
  const response = await get('/timelines/local')
  return await response.json()
}

