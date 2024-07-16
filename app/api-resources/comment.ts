import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { accountIdentifier } from './account'

export const commentResource = t.type({
  type: t.literal('comment'),
  id: t.string,
  attributes: t.type({
    content: t.string,
    createdAt: tt.DateFromISOString,
  }),
  relationships: t.type({
    author: t.type({ data: accountIdentifier }),
  }),
})

export type CommentResource = t.TypeOf<typeof commentResource>

