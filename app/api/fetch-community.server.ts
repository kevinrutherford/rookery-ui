import { get } from './get.server'

export const fetchCommunity = async (request: Request) => {
  const response = await get('/community', request)
  return await response.json()
}

