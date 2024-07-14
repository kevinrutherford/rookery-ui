import { Link, useOutletContext } from '@remix-run/react'
import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { Card } from '~/components/card'
import { CollectionTitle } from '~/components/collection-title'
import { ExplorerContext } from '../_explorer/route'

type CollectionCardProps = {
  collection: CollectionResource,
}

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => {
  const ctx = useOutletContext<ExplorerContext>()
  console.log('>>>>>>>>>>>>>>>>', ctx)

  return (
    <Card>
      <Link to={`/collections/${props.collection.id}${ctx.feedSelection}`} className='block hover:underline'>
        <CollectionTitle name={props.collection.attributes.name} isPrivate={props.collection.attributes.isPrivate} />
        <p className='mb-4'>{props.collection.attributes.description}</p>
      </Link>
    </Card>
  )
}

