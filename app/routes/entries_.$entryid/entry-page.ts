import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource } from '~/api-resources/collection'
import { EntryResponse } from './route'

export type Reply = {
  id: string,
  content: string,
}

type EntryPageData = {
  type: 'entry',
  id: string,
  attributes: {
    addedAt: string,
  },
  frontMatter?: {
    title: string,
    abstract: string,
    authors: ReadonlyArray<string>,
  },
  collection: {
    id: string,
    name: string,
  },
  comments: ReadonlyArray<Reply>,
  relationships: {
    work: {
      type: 'work',
      id: string,
    },
  },
}

export class EntryPage {
  readonly entry: EntryPageData
  readonly collection: CollectionResource

  constructor(response: EntryResponse) {
    this.entry = {
      ...response.data,
      collection: {
        id: response.included[0].id,
        name: response.included[0].attributes.name,
      },
    }
    this.collection = pipe(
      response.included,
      RA.filter((inc) => inc.type === 'collection'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No collection included with Entry') }),
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
    return this.entry.comments
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

