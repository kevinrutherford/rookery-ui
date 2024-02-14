import type { ReactNode } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { ColumnTitle } from './column-title';
import { FeedEvent } from './feed-event';
import FeedEventCard from './feed-event-card';

export const renderFeed = (data: ReadonlyArray<FeedEvent>): ReactNode => (
  <>
    <ColumnTitle title='Local timeline' icon={UserGroupIcon} />
    <ul className='overflow-y-auto'>
      { data.map((event, ix) => (
        <li key={ix} className='border-b border-slate-500'>
          <FeedEventCard {...event} />
        </li>
      ))}
    </ul>
  </>
);

