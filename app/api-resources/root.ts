import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export const rootResource = t.type({
  type: t.literal('root'),
  id: t.string,
  relationships: tt.optionFromNullable(t.type({
    community: t.type({
      data: t.type({
        type: t.literal('community'),
        id: t.string,
      }),
    }),
  })),
})

export type RootResource = t.TypeOf<typeof rootResource>

