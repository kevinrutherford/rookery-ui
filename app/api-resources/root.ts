import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { communityIdentifier } from './community'

export const rootResource = t.type({
  type: t.literal('root'),
  id: t.string,
  relationships: t.type({
    community: t.type({ data: tt.optionFromNullable(communityIdentifier) }),
  }),
})

