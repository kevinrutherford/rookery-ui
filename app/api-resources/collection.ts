import * as t from 'io-ts'

export const collectionResource = t.type({
  type: t.literal('collection'),
  id: t.string,
  attributes: t.type({
    name: t.string,
    description: t.string,
    handle: t.string,
  }),
})

export type CollectionResource = t.TypeOf<typeof collectionResource>

