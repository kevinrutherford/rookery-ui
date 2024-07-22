import { ActionFunctionArgs } from '@remix-run/node'
import { Form, Link, useLocation } from '@remix-run/react'
import { FC } from 'react'
import { Container } from '~/components/container'
import { SubmitButton } from '~/components/forms'
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
    <div className={`mb-12 pt-4 pb-4 overflow-hidden bg-${explorer.theme}-100`}>
      <Container>
        {
          (props.username)
            ? (
              <Form method='post' action={`/authbar?returnTo=${location.pathname}`}>
                <SubmitButton label='Logout' />
              </Form>
            )
            : <Link to={`/login?returnTo=${location.pathname}`}>Log in</Link>
        }
      </Container>
    </div>
  )
}

