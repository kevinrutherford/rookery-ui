import { ReactNode } from 'react'
import { AddEntry } from './add-entry'
import { EntryCard } from './entry-card'
import { CollectionResource } from './route'

export const renderPageContent = (collection: CollectionResource): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
      <p className='font-semibold'>{collection.attributes.name}</p>
      <p className='mb-8'>{collection.attributes.description}</p>
      <ul className='overflow-y-auto mb-4'>
        { collection.entries.map((entry) => (
          <li key={entry.id} className='mb-4'>
            <EntryCard collectionid={collection.id} entry={entry} />
          </li>
        ))
        }
      </ul>
    </div>
    <AddEntry collectionId={collection.id} />
  </div>
)

