import type { ReactNode } from 'react'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'
import UpdateCard from './update-card'

export const renderFeed = (page: TimelinePage): ReactNode => (
  <ul className='overflow-y-auto'>
    { page.updates.map((update, ix) => (
      <li key={ix} className='mb-4'>
        <UpdateCard update={update} page={page} />
      </li>
    ))}
  </ul>
)

