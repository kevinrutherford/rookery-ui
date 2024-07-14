import { get } from './get.server'

export const fetchTimeline = async (path: string, request: Request) => {
  const response = await get(`/timelines/${path}`, request)
  return await response.json()
}

