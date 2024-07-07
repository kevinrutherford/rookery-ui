import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { Card } from '~/components/card'
import { Column } from '~/components/column'
import { Container } from '~/components/container'
import { contentNavItems } from '~/components/content-nav-items'
import { authenticator } from '~/services/auth.server'
import { AuthBar } from '../authbar/route'
import { LocalTimeline } from '../localtimeline/route'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request)
  return json(user)
}

const ExplorerLayout = () => {
  const location = useLocation()
  const user = useLoaderData<typeof loader>()
  const username = user?.username

  return (
    <>
      <AuthBar username={username} />
      <Container>
        <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
          <Column>
            <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
              <li className='inline mr-6 mt-6 mb-6'>
                <NavLink
                  className='border-b-4 border-slate-400'
                  to={location.pathname}
                >
                  Local timeline
                </NavLink>
              </li>
            </ul>
            <LocalTimeline />
          </Column>
          <Column>
            <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
              {Object.values(contentNavItems).map((item) => (
                <li key={item.route} className='inline mr-6 mt-6 mb-6'>
                  <NavLink
                    className={({ isActive }) => isActive
                      ? 'border-b-4 border-slate-400'
                      : ''}
                    to={`${item.route}`}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Outlet />
          </Column>
        </div>
      </Container>
    </>
  )
}

export default ExplorerLayout

export function ErrorBoundary() {
  return (
    <Card>
      <p>Something went wrong!</p>
    </Card>
  )
}

