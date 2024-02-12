import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import type { FC, ReactNode } from 'react';
import stylesheet from '~/tailwind.css';
import { NewspaperIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { ColumnTitle } from './components/column-title';
import { contentNavItems } from './components/content-nav-items';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

type FeedEvent = {
  initials: string;
  userName: string;
  userHandle: string;
  timestamp: string;
  action: string;
  content: string;
};

type FEProps = FeedEvent;

function FeedEventCard(props: FEProps) {
  return (
    <div className='bg-white p-4'>
      <div className='flex justify-between mb-4'>
        <div className='flex gap-x-4'>
          <div className='flex'>
            <div className='bg-zinc-800 text-white rounded-full flex text-xl items-center justify-center w-12'>
              {props.initials}
            </div>
          </div>
          <h2>
            <div className='font-semibold'>{props.userName}</div>@{props.userHandle}
          </h2>
        </div>
        {props.timestamp}
      </div>
      <p>
        <span className='font-semibold mb-4 inline'>{props.action}</span> {props.content}
      </p>
    </div>
  );
}

const feedData: ReadonlyArray<FeedEvent> = [
  {
    initials: 'MG',
    userName: 'Mhorag Goff',
    userHandle: 'mgoff',
    timestamp: '1h',
    action: 'Commented on a paper in collection CHS:',
    content: 'Totally',
  },
  {
    initials: 'KC',
    userName: 'Kath Checkland',
    userHandle: 'khcheck',
    timestamp: '1h',
    action: 'Commented on a paper in collection CHS:',
    content: 'This is just awesome, dude!',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '3h',
    action: 'Added a paper to collection CHS:',
    content:
    'INTERROGATING INSTITUTIONAL CHANGE: ACTORS\' ATTITUDES TO COMPETITION AND COOPERATION IN COMMISSIONING HEALTH SERVICES IN ENGLAND',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '3h',
    action: 'Added a paper to collection CHS:',
    content: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
  },
  {
    initials: 'KC',
    userName: 'Kath Checkland',
    userHandle: 'khcheck',
    timestamp: '4h',
    action: 'Added a paper to collection CHS:',
    content: 'Implementing the Additional Roles Reimbursement Scheme in 7 English PCNs: a qualitative study',
  },
  {
    initials: 'MG',
    userName: 'Mhorag Goff',
    userHandle: 'mgoff',
    timestamp: '1d',
    action: 'Created collection PRU3:',
    content: 'Project PRU3 review inputs.',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '2d',
    action: 'Created collection CHS:',
    content: 'Papers being considered for the bibliography of project CHS.',
  },
];

type ColumnProps = {
  children: ReactNode;
};

const Column: FC<ColumnProps> = (props: ColumnProps) => (
  <div className='flex flex-column border-solid border border-teal-500 rounded-xl overflow-hidden'>{props.children}</div>
);

export default function App() {
  const location = useLocation();
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
                        to={`${location.pathname}?feed=local`}
                      >
                        <UserGroupIcon className='h-10 w-10 p-2 inline' />
                      </NavLink>
                    </li>
                    <li className='flex mt-6'>
                      <NavLink
                        className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                        to={`${location.pathname}?feed=feed`}
                      >
                        <NewspaperIcon className='h-10 w-10 p-2 inline' />
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col grow h-full'>
                  <ColumnTitle title='Local timeline' icon={UserGroupIcon} />
                  <ul className='overflow-y-auto'>
                    { feedData.map((event, ix) => (
                      <li key={ix} className='border-b border-teal-500'>
                        <FeedEventCard {...event} />
                      </li>
                    ))}
                  </ul>
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
                          to={`${item.route}${location.search}`}
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

