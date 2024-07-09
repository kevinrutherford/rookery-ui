import { get } from './get.server'

export const fetchWork = async (workId: string, request: Request) => {
  const response = await get(`/works/${encodeURIComponent(workId)}`, request)
  return await response.json()
}

