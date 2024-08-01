import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { collectionIdentifier } from '../collection'
import { memberIdentifier } from '../member'

export const updateCollectionCreated = t.type({
  type: t.literal('update:collection-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    collection: t.type({ data: collectionIdentifier }),
  }),
})

