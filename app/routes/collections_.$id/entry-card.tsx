import { Link } from '@remix-run/react'
import { FC } from 'react'
import { EntryResource } from './collection'

type EntryCardProps = {
  collectionid: string,
  entry: EntryResource,
}

export const EntryCard: FC<EntryCardProps> = (props: EntryCardProps) => (
  <div className='bg-slate-100 mb-4 p-4 rounded-md hover:shadow-lg'>
    <Link to={`/entries/${props.entry.id}`} className='block hover:underline'>
      {(props.entry.frontMatter) && (
        <h2 className={'font-semibold mb-4'}>{props.entry.frontMatter.title}</h2>
      )}
      <p>doi: {props.entry.relationships.work.id}</p>
    </Link>
  </div>
)

