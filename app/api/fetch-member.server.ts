import { get } from './get.server'

export const fetchMember = async (memberId: string, request: Request) => {
  const response = await get(`/members/${memberId}`, request)
  return await response.json()
}

