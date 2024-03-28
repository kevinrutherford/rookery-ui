import { Reply } from '../routes/entries_.$entryid/entry'

export type EntryResource = {
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
  collectionName: string,
  comments: ReadonlyArray<Reply>,
  relationships: {
    work: {
      type: 'work',
      id: string,
    },
  },
}

