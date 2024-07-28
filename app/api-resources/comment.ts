import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { memberIdentifier } from './member'

export const commentResource = t.type({
  type: t.literal('comment'),
  id: t.string,
  attributes: t.type({
    content: t.string,
    createdAt: tt.DateFromISOString,
  }),
  relationships: t.type({
    author: t.type({ data: memberIdentifier }),
  }),
})

export type CommentResource = t.TypeOf<typeof commentResource>

