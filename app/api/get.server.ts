import { authenticator } from '~/services/auth.server'

export const get = async (path: string, request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  }
  if (user)
    headers['Authorization'] = `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`
  const response = await fetch(`http://views:44002${path}`, {
    method: 'GET',
    headers,
  })
  if (response.status !== 200)
    throw new Error(response.statusText)
  return response
}

