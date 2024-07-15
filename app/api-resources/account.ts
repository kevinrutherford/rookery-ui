import * as t from 'io-ts'

export const accountIdentifier = t.type({
  type: t.literal('account'),
  id: t.string,
})

export const accountResource = t.intersection([
  accountIdentifier,
  t.type({
    attributes: t.type({
      username: t.string,
      display_name: t.string,
      avatar_url: t.string,
    }),
  }),
])

export type AccountResource = t.TypeOf<typeof accountResource>

