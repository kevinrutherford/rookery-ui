import * as t from 'io-ts'

export const entryResource = t.type({
  type: t.literal('entry'),
  id: t.string,
  attributes: t.type({
    addedAt: t.string,
    commentsCount: t.number,
  }),
  relationships: t.type({
    work: t.type({
      type: t.literal('work'),
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
}

