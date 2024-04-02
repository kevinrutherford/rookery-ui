import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource } from '~/api-resources/collection'
import { EntryResource } from '~/api-resources/entry'
import { CommentResource, EntryResponse } from './route'

export type Reply = {
  id: string,
  content: string,
}

export class EntryPage {
  readonly entry: EntryResource
  readonly collection: CollectionResource
  readonly includedComments: ReadonlyArray<CommentResource>

  constructor(response: EntryResponse) {
    this.entry = response.data
    this.collection = pipe(
      response.included,
      RA.filter((inc): inc is CollectionResource => inc.type === 'collection'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No collection included with Entry') }),
    )
    this.includedComments = pipe(
      response.included,
      RA.filter((inc): inc is CommentResource => inc.type === 'comment'),
    )
  }

  addedAt() {
    return new Date(this.entry.attributes.addedAt)
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
    return this.entry.relationships.work.id
  }

  frontMatter() {
    return this.entry.frontMatter
  }

  id() {
    return this.entry.id
  }
}

