import { pipe } from 'fp-ts/lib/function.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { ReactNode } from 'react'
import { CollectionResource } from '~/api-resources/collection'
import { EntryResource } from '~/api-resources/entry'
import { WorkResource } from '~/api-resources/work'
import { AddEntry } from './add-entry'
import { EntryCard } from './entry-card'
import { CollectionResponse } from './route'

type EnteredWork = {
  entry: EntryResource,
  work: WorkResource,
}

class CollectionPage {
  readonly collection: CollectionResource
  readonly includedEntries: ReadonlyArray<EnteredWork>

  constructor(response: CollectionResponse) {
    this.collection = response.data
    this.includedEntries = pipe(
      response.included,
      RA.filter((inc): inc is EntryResource => inc.type === 'entry'),
      RA.map((entry) => ({
        entry,
        work: {
          type: 'work',
          id: entry.relationships.work.data.id,
          attributes: {
            crossrefStatus: 'not-determined',
          },
        },
      })),
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
          { page.entries().map((ew) => (
            <li key={ew.entry.id} className='mb-4'>
              <EntryCard collectionid={page.id()} entry={ew.entry} work={ew.work} />
            </li>
          ))
          }
        </ul>
      </div>
      <AddEntry collectionId={page.id()} />
    </div>
  )
}

