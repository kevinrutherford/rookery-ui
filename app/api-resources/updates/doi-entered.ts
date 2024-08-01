import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { collectionIdentifier } from '../collection'
import { entryIdentifier } from '../entry'
import { memberIdentifier } from '../member'
import { workIdentifier } from '../work'

export const updateDoiEntered = t.type({
  type: t.literal('update:doi-entered'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    collection: t.type({ data: collectionIdentifier }),
    entry: t.type({ data: entryIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

