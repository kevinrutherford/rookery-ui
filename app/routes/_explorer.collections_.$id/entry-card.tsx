import { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { EntryResource } from '~/api-resources/entry'
import { WorkResource } from '~/api-resources/work'
import { Card } from '~/components/card'
import { InternalLink } from '~/components/internal-link'

const title = (work: WorkResource) => {
  switch (work.attributes.crossrefStatus) {
    case 'not-determined':
    case 'not-found':
      return `doi: ${work.id}`
    case 'found':
      return work.attributes.title
  }
}

type Props = {
  collectionid: string,
  entry: EntryResource,
  work: WorkResource,
}

export const EntryCard: FC<Props> = (props: Props) => (
  <Card>
    <InternalLink to={`/entries/${props.entry.id}`}>
      <p className='mb-4'>{title(props.work)}</p>
    </InternalLink>
    <div className='text-sm text-slate-500 flex justify-between'>
      <span>{props.entry.attributes.commentsCount} comments</span>
      <div>
        Added <ReactTimeAgo date={props.entry.attributes.addedAt} />
      </div>
    </div>
  </Card>
)

