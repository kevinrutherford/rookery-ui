import { get } from './get.server'

export const fetchAllCollections = async (request: Request) => {
  const response = await get('/collections', request)
  return await response.json()
}

