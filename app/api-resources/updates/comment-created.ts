import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { entryIdentifier } from '../entry'
import { memberIdentifier } from '../member'
import { workIdentifier } from '../work'

export const updateCommentCreated = t.type({
  type: t.literal('update:comment-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    entry: t.type({ data: entryIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

