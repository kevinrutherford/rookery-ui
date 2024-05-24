import { authenticator } from '~/services/auth.server'

export const get = async (path: string, request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  }
  if (user)
    headers['Authorization'] = `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`
  return fetch(`http://views:44002${path}`, {
    method: 'GET',
    headers,
  })
}

