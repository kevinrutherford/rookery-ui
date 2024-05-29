import type { ReactNode } from 'react'
import { TimelineParagraphResource } from '~/api-resources/timeline-paragraph'
import FeedEventCard from './feed-event-card'

export const renderFeed = (data: ReadonlyArray<TimelineParagraphResource>): ReactNode => (
  <ul className='overflow-y-auto'>
    { data.map((event, ix) => (
      <li key={ix} className='mb-4'>
        <FeedEventCard {...event} />
      </li>
    ))}
  </ul>
)

