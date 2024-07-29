import { authenticator } from '~/services/auth.server'

export const post = async (path: string, body: object, request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (user)
    headers['Authorization'] = `Bearer ${user.token}` // SMELL -- same as for GET
  return fetch(`http://commands:44001${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

