import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { DiscussionResource } from '~/api-resources/discussion'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateDoiEntered } from '~/api-resources/update'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'
import { PaperTitle } from './paper-title'

type Props = {
  update: UpdateDoiEntered,
  related: RelatedResources,
}

export const DoiEnteredUpdateBody: FC<Props> = (props: Props) => {
  const collectionRef = props.update.relationships.collection
  const collection = lookupResource(props.related, collectionRef) as CollectionResource
  const discussion = lookupResource(props.related, props.update.relationships.discussion) as DiscussionResource
  return (
    <div>
      Started a discussion about <InternalLink to={`/discussions/${props.update.relationships.discussion.data.id}`}>
        <PaperTitle text={discussion.attributes.title} />
      </InternalLink> in the collection <InternalLink to={`/collections/${collection.id}`}>
        {collection.attributes.name}
      </InternalLink>.
    </div>
  )
}

