import { NavLink } from '@remix-run/react';
import type { FC, ReactNode } from 'react';
import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

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

type WithFeedProps = {
  feedData: ReadonlyArray<FeedEvent>,
  children: ReactNode;
};

type ColumnProps = {
  children: ReactNode;
};

const Column: FC<ColumnProps> = (props: ColumnProps) => (
  <div className='flex flex-col border-solid border border-teal-500 rounded-xl overflow-hidden'>{props.children}</div>
);

type ColumnTitleProps = {
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

const ColumnTitle: FC<ColumnTitleProps> = (props: ColumnTitleProps) => (
  <div className='shrink-0 border-b border-teal-500 text-teal-700 p-3 font-semibold bg-teal-200'>
    <props.icon className='h-6 w-6 inline mr-3' />
    {props.title}
  </div>
);

export const WithFeed: FC<WithFeedProps> = (props: WithFeedProps) => (
  <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
    <Column>
      <ColumnTitle title='Local timeline' icon={UserGroupIcon} />
      <ul className='overflow-y-auto'>
        { props.feedData.map((event, ix) => (
          <li key={ix} className='border-b border-teal-500'>
            <FeedEventCard {...event} />
          </li>
        ))}
      </ul>
    </Column>
    <Column>
      <ColumnTitle title='Local collections' icon={ClipboardDocumentListIcon} />
      <div className='flex flex-row h-full'>
        {props.children}
        <div className='grow-0 bg-teal-200 border-l border-teal-500 text-teal-700 h-full'>
          <ul className='flex flex-col items-center px-2'>
            <li className='flex mt-6'>
              <NavLink
                className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                to={'collections'}
              >
                <ClipboardDocumentListIcon className='h-10 w-10 p-2 inline' />
              </NavLink>
            </li>
            <li className='flex mt-6'>
              <NavLink
                className={({ isActive }) => isActive ? 'text-teal-200 shrink rounded-full bg-teal-700 block' : '' }
                to={'settings'}
              >
                <Cog8ToothIcon className='h-10 w-10 p-2 inline' />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Column>
  </div>
);

