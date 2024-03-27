import { Link } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { EntryResource } from './collection'

type EntryCardProps = {
  collectionid: string,
  entry: EntryResource,
}

export const EntryCard: FC<EntryCardProps> = (props: EntryCardProps) => (
  <Card>
    <Link to={`/entries/${props.entry.id}`} className='block hover:underline'>
      {(props.entry.frontMatter) && (
        <h2 className={'font-semibold mb-4'}>{props.entry.frontMatter.title}</h2>
      )}
      <p className='mb-4'>doi: {props.entry.relationships.work.id}</p>
    </Link>
  </Card>
)

