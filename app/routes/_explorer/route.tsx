import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import * as api from '~/api'
import { communityResource } from '~/api-resources/community'
import { parse } from '~/api-resources/parse'
import { Card } from '~/components/card'
import { Column } from '~/components/column'
import { Container } from '~/components/container'
import { contentNavItems } from '~/components/content-nav-items'
import { ExplorerContext } from '~/components/use-explorer'
import { authenticator } from '~/services/auth.server'
import { AuthBar } from '../authbar/route'
import { FederatedTimeline } from '../federatedtimeline/route'
import { FollowingFeed } from '../followingfeed/route'
import { LocalTimeline } from '../localtimeline/route'

const communityResponse = t.type({
  community: t.type({
    data: communityResource,
  }),
  username: tt.optionFromNullable(t.string),
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const community = await api.fetchCommunity(request)
  const user = await authenticator.isAuthenticated(request)
  return json({
    community,
    username: user === null ? null : user.username,
  })
}

const ExplorerLayout = () => {
  const location = useLocation()
  const feedSelection = location.search === '' ? '?f=lt' : location.search
  const response = pipe(
    useLoaderData<unknown>(),
    parse(communityResponse),
  )
  const theme = response.community.data.attributes.theme

  return (
    <ExplorerContext.Provider value={{ feedSelection, theme }}>
      <AuthBar username={response.username} communityName={response.community.data.attributes.name} />
      <div className={`h-full pt-16 overflow-hidden bg-${theme}-200`}>
        <Container>
          <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
            <Column>
              <ul className={`p-4 bg-${theme}-100 mb-4 rounded-md`}>
                { O.isSome(response.username) && (
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
                { O.isSome(response.username) && (
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
              <ul className={`p-4 bg-${theme}-100 mb-4 rounded-md`}>
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
              <Outlet />
            </Column>
          </div>
        </Container>
      </div>
    </ExplorerContext.Provider>
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

