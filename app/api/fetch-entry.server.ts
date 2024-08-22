import { get } from './get.server'

export const fetchEntry = async (entryId: string, request: Request) => {
  const response = await get(`/discussions/${entryId}?include=collection,comments,comments.author,work`, request)
  return await response.json()
}

