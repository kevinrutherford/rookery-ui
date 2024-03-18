import { ReactNode } from 'react'
import { AddEntry } from './add-entry'
import { Collection } from './collection'
import { EntryCard } from './entry-card'

export const renderPageContent = (collection: Collection): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <p className='font-semibold'>{collection.name}</p>
    <p className='mb-4'>{collection.description}</p>
    <ul className='overflow-y-auto mb-4'>
      { collection.entries.map((entry) => (
        <li key={entry.id} className='mb-4'>
          <EntryCard collectionid={collection.id} entry={entry} />
        </li>
      ))
      }
    </ul>
    <AddEntry collectionId={collection.id} />
  </div>
)

