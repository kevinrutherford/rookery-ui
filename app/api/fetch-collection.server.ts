import { get } from './get.server'

export const fetchCollection = async (id: string) => {
  const response = await get(`/collections/${id}?include=entries,entries.work`)
  return await response.json()
}

