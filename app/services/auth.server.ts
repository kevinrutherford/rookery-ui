import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'
import { sessionStorage } from '~/services/session.server'

export const authenticator = new Authenticator<string>(sessionStorage)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username')
    const password = form.get('password')

    invariant(typeof username === 'string', 'username must be a string')
    invariant(username.length > 0, 'username must not be empty')

    invariant(typeof password === 'string', 'password must be a string')
    invariant(password.length > 0, 'password must not be empty')

    if (username === process.env.DEVELOPMENT_USERNAME)
      return username

    throw new Error('Unknown username')
  }),
  'user-pass',
)

