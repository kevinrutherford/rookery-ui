import { ReactNode } from 'react'
import { AddEntry } from './add-entry'
import { EntryCard } from './entry-card'
import { CollectionResponse } from './route'

export const renderPageContent = (collection: CollectionResponse): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
      <p className='font-semibold'>{collection.data.attributes.name}</p>
      <p className='mb-8'>{collection.data.attributes.description}</p>
      <ul className='overflow-y-auto mb-4'>
        { collection.included.map((entry) => (
          <li key={entry.id} className='mb-4'>
            <EntryCard collectionid={collection.data.id} entry={entry} />
          </li>
        ))
        }
      </ul>
    </div>
    <AddEntry collectionId={collection.data.id} />
  </div>
)

