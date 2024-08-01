import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateDoiEntered } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { title } from '../routes/_explorer.collections_.$id/entry-card'
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
  const work = lookupResource(props.related, props.update.relationships.work) as WorkResource
  return (
    <div>
      Added the paper <InternalLink to={`/entries/${props.update.relationships.entry.data.id}`}>
        <PaperTitle text={title(work)} />
      </InternalLink> to the collection <InternalLink to={`/collections/${collection.id}`}>
        {collection.attributes.name}
      </InternalLink>.
    </div>
  )
}

