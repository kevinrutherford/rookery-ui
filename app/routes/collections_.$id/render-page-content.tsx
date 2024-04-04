import { pipe } from 'fp-ts/lib/function.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { ReactNode } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { EntryResource } from '~/api-resources/entry'
import { AddEntry } from './add-entry'
import { EntryCard } from './entry-card'
import { CollectionResponse } from './route'

class CollectionPage {
  readonly collection: CollectionResource
  readonly includedEntries: ReadonlyArray<EntryResource>

  constructor(response: CollectionResponse) {
    this.collection = response.data
    this.includedEntries = pipe(
      response.included,
      RA.filter((inc): inc is EntryResource => inc.type === 'entry'),
    )
  }

  description() {
    return this.collection.attributes.description
  }

  entries() {
    return this.includedEntries
  }

  id() {
    return this.collection.id
  }

  name() {
    return this.collection.attributes.name
  }
}

export const renderPageContent = (collection: CollectionResponse): ReactNode => {
  const page = new CollectionPage(collection)

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <p className='font-semibold'>{page.name()}</p>
        <p className='mb-8'>{page.description()}</p>
        <ul className='overflow-y-auto mb-4'>
          { page.entries().map((entry) => (
            <li key={entry.id} className='mb-4'>
              <EntryCard collectionid={page.id()} entry={entry} work={{
                type: 'work',
                id: entry.relationships.work.id,
              }}/>
            </li>
          ))
          }
        </ul>
      </div>
      <AddEntry collectionId={page.id()} />
    </div>
  )
}

