import * as t from 'io-ts'

export const communityResource = t.type({
  type: t.literal('community'),
  id: t.string,
  attributes: t.type({
    name: t.string,
    affiliation: t.string,
    overview: t.array(t.string),
  }),
})

export type CommunityResource = t.TypeOf<typeof communityResource>

