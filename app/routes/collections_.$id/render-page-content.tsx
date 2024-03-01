import { Collection } from './collection';
import { ReactNode } from 'react';
import { EntryCard } from './entry-card';

export const renderPageContent = (collection: Collection): ReactNode => (
  <div className='grow'>
    <p className='font-semibold'>{collection.name}</p>
    <p className='mb-4'>{collection.description}</p>
    <ul className='overflow-y-auto'>
      { collection.entries.map((entry) => (
        <li key={entry.id} className='mb-4'>
          <EntryCard collectionid={collection.id} entry={entry} />
        </li>
      ))
      }
    </ul>
  </div>
)

