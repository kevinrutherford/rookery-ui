import { ReactNode } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { CollectionCard } from './collection-card'
import { CreateCollection } from './create-collection'

export const renderPageContent = (data: ReadonlyArray<CollectionResource>): ReactNode => (
  <div className='grow'>
    <ul className='overflow-y-auto'>
      { data.map((collection) => (
        <li key={collection.attributes.name} className='mb-4'>
          <CollectionCard collection={collection} />
        </li>
      ))
      }
    </ul>
    <CreateCollection />
  </div>
)

