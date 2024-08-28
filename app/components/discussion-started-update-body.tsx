import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { DiscussionResource } from '~/api-resources/discussion'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateDiscussionStarted } from '~/api-resources/update'
import { DiscussionLink } from './discussion-link'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateDiscussionStarted,
  related: RelatedResources,
}

export const DiscussionStartedUpdateBody: FC<Props> = (props: Props) => {
  const collectionRef = props.update.relationships.collection
  const collection = lookupResource(props.related, collectionRef) as CollectionResource
  const discussion = lookupResource(props.related, props.update.relationships.discussion) as DiscussionResource
  return (
    <div>
      Started a discussion about <DiscussionLink discussion={discussion} /> in the collection <InternalLink to={`/collections/${collection.id}`}>
        {collection.attributes.name}
      </InternalLink>.
    </div>
  )
}

