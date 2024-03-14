import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { Column } from './components/column'
import { contentNavItems } from './components/content-nav-items'
import { LocalTimeline } from './routes/localtimeline/route'

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
]

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}

export default function App() {
  const location = useLocation()
  const feed = location.search.length === 0 ? '?timeline=local' : location.search
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-slate-200 text-slate-600">
        <div className="min-h-screen h-full flex flex-col">
          <div className='container mx-auto my-12 h-full overflow-hidden'>
            <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
              <Column>
                <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
                  <li className='inline mr-6 mt-6 mb-6'>
                    <NavLink
                      className={({ isActive }) => isActive
                        ? 'border-b-4 border-slate-400'
                        : '' }
                      to={`${location.pathname}?timeline=local`}
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
                          : '' }
                        to={`${item.route}${feed}`}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className='flex flex-col grow h-full'>
                  <Outlet />
                </div>
              </Column>
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

