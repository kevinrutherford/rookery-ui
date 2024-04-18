import * as t from 'io-ts'

export const communityResource = t.type({
  community: t.type({
    name: t.string,
    affiliation: t.string,
    overview: t.string,
    admins: t.array(t.string),
  }),
})

export type CommunityResource = t.TypeOf<typeof communityResource>

