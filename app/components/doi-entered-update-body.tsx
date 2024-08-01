import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateDoiEntered } from '~/api-resources/update'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateDoiEntered,
  related: RelatedResources,
}

export const DoiEnteredUpdateBody: FC<Props> = (props: Props) => {
  const collectionRef = props.update.relationships.collection
  const collection = lookupResource(props.related, collectionRef) as CollectionResource
  return (
    <div>
      Added the paper xyz
      to collection <InternalLink to={`/collections/${collection.id}`}>
        {collection.attributes.name}
      </InternalLink>.
    </div>
  )
}

