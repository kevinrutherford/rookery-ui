import { ActionFunctionArgs } from '@remix-run/node'
import { Form, Link, useLocation } from '@remix-run/react'
import { FC } from 'react'
import { Container } from '~/components/container'
import { SubmitButton } from '~/components/forms'
import { authenticator } from '~/services/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/' })
};

type Props = {
  username?: string,
}

export const AuthBar: FC<Props> = (props: Props) => {
  const location = useLocation()
  return (
    <div className='mb-12 pt-4 pb-4 overflow-hidden bg-slate-100'>
      <Container>
        {
          (props.username)
            ? (
              <Form method='post' action='/authbar'>
                <SubmitButton label='Logout' />
              </Form>
            )
            : <Link to={`/login?returnTo=${location.pathname}`}>Log in</Link>
        }
      </Container>
    </div>
  )
}

