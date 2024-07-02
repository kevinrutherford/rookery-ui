import type { ReactNode } from 'react'
import { UpdateResource } from '~/api-resources/update'
import UpdateCard from './update-card'

export const renderFeed = (data: ReadonlyArray<UpdateResource>): ReactNode => (
  <ul className='overflow-y-auto'>
    { data.map((event, ix) => (
      <li key={ix} className='mb-4'>
        <UpdateCard {...event} />
      </li>
    ))}
  </ul>
)

