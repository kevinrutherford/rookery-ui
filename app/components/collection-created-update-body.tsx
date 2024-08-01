import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateCollectionCreated } from '~/api-resources/update'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateCollectionCreated,
  related: RelatedResources,
}

export const CollectionCreatedUpdateBody: FC<Props> = (props: Props) => {
  const collectionRef = props.update.relationships.collection
  const collection = lookupResource(props.related, collectionRef) as CollectionResource
  return (
    <div>
      Created a new collection called &ldquo;<InternalLink to={`/collections/${collection.id}`}>
        {collection.attributes.name}
      </InternalLink>&rdquo;.
    </div>
  )
}

