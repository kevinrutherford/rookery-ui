import { get } from './get.server'

export const fetchCommunity = async () => {
  const response = await get('/community')
  return await response.json()
}

