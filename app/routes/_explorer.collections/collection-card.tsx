import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { Card } from '~/components/card'
import { CollectionTitle } from '~/components/collection-title'
import { Navigate } from '~/components/navigate'

type CollectionCardProps = {
  collection: CollectionResource,
}

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <Card>
    <Navigate to={`/collections/${props.collection.id}`}>
      <CollectionTitle name={props.collection.attributes.name} isPrivate={props.collection.attributes.isPrivate} />
      <p className='mb-4'>{props.collection.attributes.description}</p>
    </Navigate>
  </Card>
)

