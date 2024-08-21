import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { workIdentifier } from './work'

export const discussionIdentifier = t.type({
  type: t.literal('discussion'),
  id: t.string,
})

export const discussionResource = t.intersection([
  discussionIdentifier,
  t.type({
    attributes: t.type({
      addedAt: tt.DateFromISOString,
      title: t.string,
      commentsCount: t.number,
    }),
    relationships: t.type({
      work: t.type({ data: workIdentifier }),
    }),
  }),
])

export type DiscussionResource = t.TypeOf<typeof discussionResource>

