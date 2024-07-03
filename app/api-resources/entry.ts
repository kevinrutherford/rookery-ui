import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { workIdentifier } from './work'

export const entryResource = t.type({
  type: t.literal('entry'),
  id: t.string,
  attributes: t.type({
    addedAt: tt.DateFromISOString,
    commentsCount: t.number,
  }),
  relationships: t.type({
    work: t.type({ data: workIdentifier }),
  }),
})

export type EntryResource = t.TypeOf<typeof entryResource>

