import * as t from 'io-ts'

export const communityIdentifier = t.type({
  type: t.literal('community'),
  id: t.string,
})

export const communityResource = t.intersection([
  communityIdentifier,
  t.type({
    attributes: t.type({
      name: t.string,
      affiliation: t.string,
      overview: t.array(t.string),
    }),
  }),
])

export type CommunityResource = t.TypeOf<typeof communityResource>

