import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource  } from '~/api-resources/collection'
import { DiscussionResource } from '~/api-resources/discussion'
import { WorkResource  } from '~/api-resources/work'
import { CollectionResponse } from './route'

type EnteredWork = {
  entry: DiscussionResource,
  work: WorkResource,
}

export class CollectionPage {
  readonly collection: CollectionResource
  readonly includedDiscussions: ReadonlyArray<EnteredWork>

  constructor(response: CollectionResponse) {
    this.collection = response.data
    this.includedDiscussions = pipe(
      response.included,
      RA.filter((inc): inc is DiscussionResource => inc.type === 'discussion'),
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

  discussions() {
    return this.includedDiscussions
  }

  id() {
    return this.collection.id
  }

  isPrivate() {
    return this.collection.attributes.isPrivate
  }

  name() {
    return this.collection.attributes.name
  }
}

