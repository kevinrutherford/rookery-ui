import { CollectionCard } from './collection-card';
import { CollectionSummary } from './collection-summary';
import { ReactNode } from 'react';
import { CreateCollection } from './create-collection';

export const renderPageContent = (data: ReadonlyArray<CollectionSummary>): ReactNode => (
  <div className='grow'>
    <ul className='overflow-y-auto'>
      { data.map((collection) => (
        <li key={collection.name} className='mb-4'>
          <CollectionCard collection={collection} />
        </li>
      ))
      }
    </ul>
    <CreateCollection />
  </div>
)

