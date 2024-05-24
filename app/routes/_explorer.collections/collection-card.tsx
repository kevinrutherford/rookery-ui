import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import { FC } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { Card } from '~/components/card'

type CollectionCardProps = {
  collection: CollectionResource,
}

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <Card>
    <Link to={`/collections/${props.collection.id}`} className='block hover:underline'>
      <div className='flex justify-between mb-4'>
        <h2 className='font-semibold'>{props.collection.attributes.name}</h2>
        { false && <EyeSlashIcon className='h-5 w-5 pl-1 inline' /> }
      </div>
      <p className='mb-4'>{props.collection.attributes.description}</p>
    </Link>
  </Card>
)

