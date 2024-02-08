import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import stylesheet from '~/tailwind.css';
import { WithFeed } from './components/with-feed';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export type FeedEvent = {
  initials: string;
  userName: string;
  userHandle: string;
  timestamp: string;
  action: string;
  content: string;
};

type FEProps = FeedEvent;

export function FeedEventCard(props: FEProps) {
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

export default function App() {
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
            <WithFeed feedData={feedData}>
              <Outlet />
            </WithFeed>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

