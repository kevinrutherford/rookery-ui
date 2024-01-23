import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { FC, ReactNode } from 'react';
import stylesheet from "~/tailwind.css";
import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
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
          <div className='avatar placeholder'>
            <div className='bg-neutral text-neutral-content rounded-full w-12'>
              <span className='text-xl'>{props.initials}</span>
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

const event7: FeedEvent = {
  initials: 'MG',
  userName: 'Mhorag Goff',
  userHandle: 'mgoff',
  timestamp: '1h',
  action: 'Commented on a paper in collection CHS:',
  content: 'Totally',
};

const event6: FeedEvent = {
  initials: 'KC',
  userName: 'Kath Checkland',
  userHandle: 'khcheck',
  timestamp: '1h',
  action: 'Commented on a paper in collection CHS:',
  content: 'This is just awesome, dude!',
};

const event5: FeedEvent = {
  initials: 'DB',
  userName: 'Donna Bramwell',
  userHandle: 'DonnaB',
  timestamp: '3h',
  action: 'Added a paper to collection CHS:',
  content:
    'INTERROGATING INSTITUTIONAL CHANGE: ACTORS\' ATTITUDES TO COMPETITION AND COOPERATION IN COMMISSIONING HEALTH SERVICES IN ENGLAND',
};

const event4: FeedEvent = {
  initials: 'DB',
  userName: 'Donna Bramwell',
  userHandle: 'DonnaB',
  timestamp: '3h',
  action: 'Added a paper to collection CHS:',
  content: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
};

const event3: FeedEvent = {
  initials: 'KC',
  userName: 'Kath Checkland',
  userHandle: 'khcheck',
  timestamp: '4h',
  action: 'Added a paper to collection CHS:',
  content: 'Implementing the Additional Roles Reimbursement Scheme in 7 English PCNs: a qualitative study',
};

const event2: FeedEvent = {
  initials: 'MG',
  userName: 'Mhorag Goff',
  userHandle: 'mgoff',
  timestamp: '1d',
  action: 'Created collection PRU3:',
  content: 'Project PRU3 review inputs.',
};

const event1: FeedEvent = {
  initials: 'DB',
  userName: 'Donna Bramwell',
  userHandle: 'DonnaB',
  timestamp: '2d',
  action: 'Created collection CHS:',
  content: 'Papers being considered for the bibliography of project CHS.',
};

type ColumnProps = {
  children: ReactNode;
};

const Column: FC<ColumnProps> = (props: ColumnProps) => (
  <div className='flex flex-col border-solid border border-amber-500 rounded-xl overflow-hidden'>{props.children}</div>
);

type ColumnTitleProps = {
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

const ColumnTitle: FC<ColumnTitleProps> = (props: ColumnTitleProps) => (
  <div className='shrink-0 border-b border-amber-500 text-amber-700 p-3 font-semibold bg-amber-200'>
    <props.icon className='h-6 w-6 inline mr-3' />
    {props.title}
  </div>
);

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className='container mx-auto my-12 h-full overflow-hidden'>
          <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
            <Column>
              <ColumnTitle title='Local timeline' icon={UserGroupIcon} />
              <ul className='overflow-y-auto'>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event7} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event6} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event5} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event4} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event3} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event2} />
                </li>
                <li className='border-b border-amber-500'>
                  <FeedEventCard {...event1} />
                </li>
              </ul>
            </Column>
            <Column>
              <ColumnTitle title='Local collections' icon={ClipboardDocumentListIcon} />
              <div className='flex flex-row h-full'>
                <div className='grow card bg-base-100 card-bordered'>
                  <div className='card-body'>
                    <h2 className='card-title'>CHS</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                  </div>
                </div>
                <div className='grow-0 bg-amber-200 border-l border-amber-500 text-amber-700 h-full'>
                  <ul>
                    <li><ClipboardDocumentListIcon className='text-orange-500 h-6 w-6 inline mx-4 mt-6' /></li>
                    <li><Cog8ToothIcon className='h-6 w-6 inline mx-4 mt-6' /></li>
                  </ul>
                </div>
              </div>
            </Column>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

