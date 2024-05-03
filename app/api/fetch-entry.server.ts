import { get } from './get.server'

export const fetchEntry = async (entryId: string) => {
  const response = await get(`/entries/${entryId}?include=collection,comments,work`)
  return await response.json()
}

