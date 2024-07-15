import type { ReactNode } from 'react'
import UpdateCard from '~/components/update-card'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'

export const renderFeed = (page: TimelinePage): ReactNode => (
  <ul className='overflow-y-auto'>
    { page.updates.map((update, ix) => (
      <li key={ix} className='mb-4'>
        <UpdateCard update={update} page={page} />
      </li>
    ))}
  </ul>
)

