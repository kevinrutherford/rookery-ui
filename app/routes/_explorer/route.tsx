import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
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
import { FederatedTimeline } from '../federatedtimeline/route'
import { FollowingFeed } from '../followingfeed/route'
import { LocalTimeline } from '../localtimeline/route'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request)
  return json(user)
}

export type ExplorerContext = {
  feedSelection: string,
}

const ExplorerLayout = () => {
  const location = useLocation()
  const feedSelection = location.search
  const user = useLoaderData<typeof loader>()
  const username = user?.username

  return (
    <>
      <AuthBar username={username} />
      <Container>
        <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
          <Column>
            <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
              { user && (
                <li className='inline mr-6 mt-6 mb-6'>
                  <Link
                    className={`${feedSelection === '?f=ff' ? 'border-b-4 border-slate-400' : ''}`}
                    to={`${location.pathname}?f=ff`}
                  >
                    Following
                  </Link>
                </li>
              )}
              <li className='inline mr-6 mt-6 mb-6'>
                <Link
                  className={`${feedSelection === '?f=lt' ? 'border-b-4 border-slate-400' : ''}`}
                  to={`${location.pathname}?f=lt`}
                >
                  Local
                </Link>
              </li>
              { user && (
                <li className='inline mr-6 mt-6 mb-6'>
                  <Link
                    className={`${feedSelection === '?f=ft' ? 'border-b-4 border-slate-400' : ''}`}
                    to={`${location.pathname}?f=ft`}
                  >
                    Federated
                  </Link>
                </li>
              )}
            </ul>
            {
              (feedSelection === '?f=ff')
                ? <FollowingFeed />
                : ((feedSelection === '?f=lt') ? <LocalTimeline /> : <FederatedTimeline />) }
          </Column>
          <Column>
            <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
              {Object.values(contentNavItems).map((item) => (
                <li key={item.route} className='inline mr-6 mt-6 mb-6'>
                  <NavLink
                    className={({ isActive }) => isActive
                      ? 'border-b-4 border-slate-400'
                      : ''}
                    to={`${item.route}${feedSelection}`}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Outlet context={{ feedSelection }} />
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

