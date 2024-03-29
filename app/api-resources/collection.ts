import * as t from 'io-ts'
import { entryResource } from './entry'

export const collectionResource = t.type({
  type: t.literal('collection'),
  id: t.string,
  attributes: t.type({
    name: t.string,
    description: t.string,
    handle: t.string,
  }),
  entries: t.array(entryResource),
})

export type CollectionResource = t.TypeOf<typeof collectionResource>

