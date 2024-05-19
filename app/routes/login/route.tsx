import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Card } from '~/components/card'
import { Container } from '~/components/container'
import { SubmitButton, TextField } from '~/components/forms'
import { authenticator } from '~/services/auth.server'

export default function LoginScreen() {
  return (
    <Container>
      <Card>
        <h3>Log in</h3>
        <Form method="post">
          <TextField label='Username' attr='username' />
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label className="block text-slate-500 md:text-right md:mb-0 pr-4" htmlFor='password'>
            Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input type='password' name='password' required
                className="bg-slate-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          <SubmitButton label='Log in' />
        </Form>
      </Card>
    </Container>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
};

