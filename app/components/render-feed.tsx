import type { ReactNode } from 'react'
import UpdateCard from '~/components/update-card'
import { TimelinePage } from './timeline-page'

export const renderFeed = (page: TimelinePage): ReactNode => (
  <ul className='overflow-y-auto'>
    { page.updates.map((update, ix) => (
      <li key={ix} className='mb-4'>
        <UpdateCard update={update} related={page.includes} />
      </li>
    ))}
  </ul>
)

