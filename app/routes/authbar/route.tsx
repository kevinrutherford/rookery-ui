import { ActionFunctionArgs } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { FC } from 'react'
import { SubmitButton } from '~/components/forms'
import { authenticator } from '~/services/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/' })
};

type Props = {
  username?: string,
}

export const AuthBar: FC<Props> = (props: Props) => {
  if (props.username)
    return (
      <Form method='post' action='/authbar'>
        <SubmitButton label='Logout' />
      </Form>
    )
  return <Link to='/login'>Log in</Link>
}

