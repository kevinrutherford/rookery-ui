import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { SubmitButton } from '~/components/forms'
import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const username = await authenticator.isAuthenticated(request)
  return json({ username })
}

export const AuthBar = () => {
  const user = useLoaderData<typeof loader>()
  if (user)
    return (
      <Form>
        <SubmitButton label='Logout' />
      </Form>
    )
  return <Link to='/login'>Log in</Link>
}

