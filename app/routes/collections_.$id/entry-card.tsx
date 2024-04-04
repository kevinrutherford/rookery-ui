import { Link } from '@remix-run/react'
import { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { EntryResource } from '~/api-resources/entry'
import { WorkResource } from '~/api-resources/work'

type EntryCardProps = {
  collectionid: string,
  entry: EntryResource,
  work: WorkResource,
}

export const EntryCard: FC<EntryCardProps> = (props: EntryCardProps) => (
  <div className='bg-slate-100 mb-4 p-4 rounded-md hover:shadow-lg'>
    <Link to={`/entries/${props.entry.id}`} className='block hover:underline'>
      <p className='mb-4'>doi: {props.work.id}</p>
      <div className='text-sm text-slate-500 flex justify-between'>
        <span>{props.entry.attributes.commentsCount} comments</span>
        <div>
          Added <ReactTimeAgo date={props.entry.attributes.addedAt} />
        </div>
      </div>
    </Link>
  </div>
)

