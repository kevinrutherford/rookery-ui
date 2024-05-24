import { get } from './get.server'

export const fetchRoot = async (request: Request) => {
  const response = await get('/', request)
  return await response.json()
}

