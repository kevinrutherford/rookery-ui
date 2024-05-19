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

export const AuthBar: FC<Props> = (props: Props) => (
  <div className='mb-12 pt-4 pb-4 overflow-hidden bg-slate-100'>
    <div className='container mx-auto h-full overflow-hidden'>
      {
        (props.username)
          ? (
            <Form method='post' action='/authbar'>
              <SubmitButton label='Logout' />
            </Form>
          )
          : <Link to='/login'>Log in</Link>
      }
    </div>
  </div>
)

