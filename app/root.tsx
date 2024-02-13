import type { LinksFunction, MetaFunction } from '@remix-run/node';
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
} from '@remix-run/react';
import stylesheet from '~/tailwind.css';
import { NewspaperIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { contentNavItems } from './components/content-nav-items';
import { Column } from './components/column';
import { renderFeed } from './components/render-feed';
import { fakeFeedData } from './components/fake-feed-data';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  const location = useLocation();
  const feed = location.search.length === 0 ? '?timeline=local' : location.search;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-zinc-100 text-zinc-600">
        <div className="min-h-screen h-full flex flex-col">
          <div className='container mx-auto my-12 h-full overflow-hidden'>
            <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
              <Column>
                <div className='grow-0 bg-teal-200 border-r border-teal-500 text-teal-700 h-full'>
                  <ul className='flex flex-col items-center px-2'>
                    <li className='flex mt-6'>
                      <NavLink
                        className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                        to={`${location.pathname}?timeline=local`}
                      >
                        <UserGroupIcon className='h-10 w-10 p-2 inline' />
                      </NavLink>
                    </li>
                    <li className='flex mt-6'>
                      <NavLink
                        className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                        to={`${location.pathname}?timeline=home`}
                      >
                        <NewspaperIcon className='h-10 w-10 p-2 inline' />
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col grow h-full'>
                  {renderFeed(fakeFeedData())}
                </div>
              </Column>
              <Column>
                <div className='flex flex-col grow h-full'>
                  <Outlet />
                </div>
                <div className='grow-0 bg-teal-200 border-l border-teal-500 text-teal-700 h-full'>
                  <ul className='flex flex-col items-center px-2'>
                    {Object.values(contentNavItems).map((item) => (
                      <li key={item.route} className='flex mt-6'>
                        <NavLink
                          className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                          to={`${item.route}${feed}`}
                        >
                          {item.icon}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
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
  );
}

