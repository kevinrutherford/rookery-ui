import { CollectionCard } from './collection-card';
import { Collection } from './collection';
import { ReactNode } from 'react';

export const renderPageContent = (data: ReadonlyArray<Collection>): ReactNode => (
  <div className='grow'>
    <ul className='overflow-y-auto'>
      { data.map((collection) => (
        <li key={collection.name} className='mb-4'>
          <CollectionCard collection={collection} />
        </li>
      ))
      }
    </ul>
  </div>
)

