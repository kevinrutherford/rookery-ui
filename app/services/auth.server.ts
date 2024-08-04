import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'
import { sessionStorage } from '~/services/session.server'

const hardcodedUsers = new Map([
  [process.env.USER_1_USERNAME, process.env.USER_1_ID],
  [process.env.USER_2_USERNAME, process.env.USER_2_ID],
  [process.env.USER_3_USERNAME, process.env.USER_3_ID],
])

export type User = {
  id: string,
  username: string,
  token: string,
}

export const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username')
    const password = form.get('password')

    invariant(typeof username === 'string', 'username must be a string')
    invariant(username.length > 0, 'username must not be empty')

    invariant(typeof password === 'string', 'password must be a string')
    invariant(password.length > 0, 'password must not be empty')

    const userId = hardcodedUsers.get(username)
    if (userId) {
      return {
        id: userId,
        username,
        token: userId,
      } satisfies User
    }

    throw new Error('Unknown username')
  }),
  'user-pass',
)

