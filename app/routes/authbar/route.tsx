import { ActionFunctionArgs } from '@remix-run/node'
import { Form, Link, useLocation } from '@remix-run/react'
import { FC } from 'react'
import { Container } from '~/components/container'
import { useExplorer } from '~/components/use-explorer'
import { authenticator } from '~/services/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url)
  const returnTo = url.searchParams.get('returnTo') ?? '/' // SMELL -- OAOO: "returnTo"
  await authenticator.logout(request, { redirectTo: returnTo })
};

type Props = {
  username?: string,
}

export const AuthBar: FC<Props> = (props: Props) => {
  const explorer = useExplorer()
  const location = useLocation()
  return (
    <div className={`pt-4 pb-4 overflow-hidden bg-${explorer.theme}-100`}>
      <Container>
        <div className='flex justify-between'>
          <span className='font-bold'>Community name</span>
          {
            (props.username)
              ? (
                <span>Logged in as <span className='font-semibold'>{props.username}</span></span>
              )
              : ''
          }
          {
            (props.username)
              ? (
                <Form method='post' action={`/authbar?returnTo=${location.pathname}`}>
                  <button type="submit">
                    Logout
                  </button>
                </Form>
              )
              : <Link to={`/login?returnTo=${location.pathname}`}>Log in</Link>
          }
        </div>
      </Container>
    </div>
  )
}

