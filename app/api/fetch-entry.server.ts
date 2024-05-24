import { get } from './get.server'

export const fetchEntry = async (entryId: string, request: Request) => {
  const response = await get(`/entries/${entryId}?include=collection,comments,work`, request)
  return await response.json()
}

