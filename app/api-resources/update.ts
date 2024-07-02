import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export const updateResource = t.type({
  type: t.literal('update'),
  id: t.string,
  attributes: t.type({
    actor: t.string,
    timestamp: tt.DateFromISOString,
    action: t.string,
    content: t.string,
  }),
})

export type UpdateResource = t.TypeOf<typeof updateResource>

