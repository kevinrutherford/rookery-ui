import { get } from './get.server'

export const fetchCollection = async (id: string, request: Request) => {
  const response = await get(`/collections/${id}?include=entries,entries.work`, request)
  return await response.json()
}

