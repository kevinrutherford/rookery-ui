import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { workIdentifier } from './work'

export const entryIdentifier = t.type({
  type: t.literal('entry'),
  id: t.string,
})

export const entryResource = t.intersection([
  entryIdentifier,
  t.type({
    type: t.literal('entry'),
    id: t.string,
    attributes: t.type({
      addedAt: tt.DateFromISOString,
      title: t.string,
      commentsCount: t.number,
    }),
    relationships: t.type({
      work: t.type({ data: workIdentifier }),
    }),
  }),
])

export type EntryResource = t.TypeOf<typeof entryResource>

