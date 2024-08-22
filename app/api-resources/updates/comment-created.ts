import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { discussionIdentifier } from '../discussion'
import { memberIdentifier } from '../member'

export const updateCommentCreated = t.type({
  type: t.literal('update:comment-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    entry: t.type({ data: discussionIdentifier }),
  }),
})

export const inboxUpdateCommentCreated = t.type({
  type: t.literal('inbox-update:comment-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    entry: t.type({
      data: t.union([discussionIdentifier, t.null]),
    }),
  }),
})

