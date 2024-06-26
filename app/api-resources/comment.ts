import * as t from 'io-ts'

export const commentResource = t.type({
  type: t.literal('comment'),
  id: t.string,
  attributes: t.type({
    content: t.string,
    createdAt: t.string,
  }),
})

export type CommentResource = t.TypeOf<typeof commentResource>

