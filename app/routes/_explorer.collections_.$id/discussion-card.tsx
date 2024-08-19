import { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { EntryResource } from '~/api-resources/entry'
import { Card } from '~/components/card'
import { InternalLink } from '~/components/internal-link'
import { Metadata } from '~/components/metadata'

type Props = {
  collectionid: string,
  discussion: EntryResource,
}

export const DiscussionCard: FC<Props> = (props: Props) => (
  <Card>
    <InternalLink to={`/entries/${props.discussion.id}`}>
      <p className='mb-4'>{props.discussion.attributes.title}</p>
    </InternalLink>
    <Metadata>
      <span>{props.discussion.attributes.commentsCount} comments</span>
      <div>
        Added <ReactTimeAgo date={props.discussion.attributes.addedAt} />
      </div>
    </Metadata>
  </Card>
)

