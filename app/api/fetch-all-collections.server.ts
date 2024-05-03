import { get } from './get.server'

export const fetchAllCollections = async () => {
  const response = await get('/collections')
  return await response.json()
}

