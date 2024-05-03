import { get } from './get.server'

export const fetchRoot = async () => {
  const response = await get('/')
  return await response.json()
}

