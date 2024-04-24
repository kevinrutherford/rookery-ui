import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export const rootResource = t.type({
  type: t.literal('root'),
  id: t.string,
  relationships: t.type({
    community: t.type({
      data: tt.optionFromNullable(t.type({
        type: t.literal('community'),
        id: t.string,
      })),
    }),
  }),
})

export type RootResource = t.TypeOf<typeof rootResource>

