import { get } from './get.server'

export const fetchDiscussion = async (discussionId: string, request: Request) => {
  const response = await get(`/discussions/${discussionId}?include=collection,comments,comments.author,work`, request)
  return await response.json()
}

