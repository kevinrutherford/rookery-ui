import * as t from 'io-ts'

export const collectionIdentifier = t.type({
  type: t.literal('collection'),
  id: t.string,
})

export const collectionResource = t.intersection([
  collectionIdentifier,
  t.type({
    attributes: t.type({
      name: t.string,
      description: t.string,
      discussionCount: t.number,
      isPrivate: t.boolean,
    }),
  }),
])

export type CollectionResource = t.TypeOf<typeof collectionResource>

