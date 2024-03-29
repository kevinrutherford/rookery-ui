import * as t from 'io-ts'
import { Reply } from '../routes/entries_.$entryid/entry'

export const entryResource = t.type({
  id: t.string,
  relationships: t.type({
    work: t.type({
      id: t.string,
    }),
  }),
})

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

