import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource } from '~/api-resources/collection'
import { CommentResource } from '~/api-resources/comment'
import { EntryResource } from '~/api-resources/entry'
import { WorkResource } from '~/api-resources/work'
import { EntryResponse } from './route'

export class EntryPage {
  readonly entry: EntryResource
  readonly collection: CollectionResource
  readonly work: WorkResource
  readonly includedComments: ReadonlyArray<CommentResource>

  constructor(response: EntryResponse) {
    this.entry = response.data
    this.collection = pipe(
      response.included,
      RA.filter((inc): inc is CollectionResource => inc.type === 'collection'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No collection included with Entry') }),
    )
    this.work = pipe(
      response.included,
      RA.filter((inc): inc is WorkResource => inc.type === 'work'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No Work included with Entry') }),
    )
    this.includedComments = pipe(
      response.included,
      RA.filter((inc): inc is CommentResource => inc.type === 'comment'),
    )
  }

  addedAt(): Date {
    return this.entry.attributes.addedAt
  }

  collectionId() {
    return this.collection.id
  }

  collectionName() {
    return this.collection.attributes.name
  }

  comments() {
    return this.includedComments
  }

  doi() {
    return this.work.id
  }

  id() {
    return this.entry.id
  }

  isPaper() {
    return this.work.attributes.crossrefStatus !== 'not-found'
  }

  title() {
    switch (this.work.attributes.crossrefStatus) {
      case 'not-determined':
      case 'not-found':
        return `doi: ${this.work.id}`
      case 'found':
        return this.work.attributes.title
    }
  }
}

