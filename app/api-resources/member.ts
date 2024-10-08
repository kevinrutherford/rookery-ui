import * as t from 'io-ts'

export const memberIdentifier = t.type({
  type: t.literal('member'),
  id: t.string,
})

export const memberResource = t.intersection([
  memberIdentifier,
  t.type({
    attributes: t.type({
      username: t.string,
      display_name: t.string,
      avatar_url: t.string,
      followingCount: t.number,
    }),
    relationships: t.type({
      followers: t.type({
        meta: t.type({
          count: t.number,
        }),
      }),
    }),
  }),
])

export type MemberResource = t.TypeOf<typeof memberResource>

