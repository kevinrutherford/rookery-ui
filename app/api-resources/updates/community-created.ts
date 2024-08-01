import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { communityIdentifier } from '../community'
import { memberIdentifier } from '../member'

export const updateCommunityCreated = t.type({
  type: t.literal('update:community-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    community: t.type({ data: tt.optionFromNullable(communityIdentifier) }),
  }),
})

