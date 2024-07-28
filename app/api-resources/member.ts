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
    }),
  }),
])

export type MemberResource = t.TypeOf<typeof memberResource>

