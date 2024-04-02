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

  constructor(response: EntryResponse) {
    this.entry = {
      ...response.data,
      collection: {
        id: response.included[0].id,
        name: response.included[0].attributes.name,
      },
    }
  }

  addedAt() {
    return new Date(this.entry.attributes.addedAt)
  }

  collectionId() {
    return this.entry.collection.id
  }

  collectionName() {
    return this.entry.collection.name
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

