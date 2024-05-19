import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource  } from '~/api-resources/collection'
import { EntryResource  } from '~/api-resources/entry'
import { WorkResource  } from '~/api-resources/work'
import { CollectionResponse } from './route'

type EnteredWork = {
  entry: EntryResource,
  work: WorkResource,
}

export class CollectionPage {
  readonly collection: CollectionResource
  readonly includedEntries: ReadonlyArray<EnteredWork>

  constructor(response: CollectionResponse) {
    this.collection = response.data
    this.includedEntries = pipe(
      response.included,
      RA.filter((inc): inc is EntryResource => inc.type === 'entry'),
      RA.map((entry) => ({
        entry,
        work: pipe(
          response.included,
          RA.filter((inc): inc is WorkResource => inc.type === 'work'),
          RA.filter((work) => work.id === entry.relationships.work.data.id),
          RA.head,
          O.getOrElseW(() => { throw new Error('Work for entry not found') }),
        ),
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

