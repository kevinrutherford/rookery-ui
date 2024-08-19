import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { Card } from '~/components/card'
import { CollectionTitle } from '~/components/collection-title'
import { InternalLink } from '~/components/internal-link'

type CollectionCardProps = {
  collection: CollectionResource,
}

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <Card>
    <InternalLink to={`/collections/${props.collection.id}`}>
      <CollectionTitle name={props.collection.attributes.name} isPrivate={props.collection.attributes.isPrivate} />
      <p className='mb-4'>{props.collection.attributes.description}</p>
      <div className='text-sm text-slate-500 flex justify-between'>
        <span></span>
        <span>
          {props.collection.attributes.discussionCount} discussions
        </span>
      </div>
    </InternalLink>
  </Card>
)

