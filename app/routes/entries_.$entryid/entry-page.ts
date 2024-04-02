import { EntryPageData } from './entry'

export class EntryPage {
  readonly entry: EntryPageData

  constructor(entry: EntryPageData) {
    this.entry = entry
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

