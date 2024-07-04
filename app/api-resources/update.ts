import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { communityIdentifier } from './community'

const classicUpdate = t.type({
  type: t.literal('update'),
  id: t.string,
  attributes: t.type({
    actor: t.string,
    occurred_at: tt.DateFromISOString,
    action: t.string,
    content: t.string,
  }),
})

const updateCommunityCreated = t.type({
  type: t.literal('update:community-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    community: t.type({ data: tt.optionFromNullable(communityIdentifier) }),
  }),
})

export const updateResource = t.union([
  classicUpdate,
  updateCommunityCreated,
])

export type UpdateResource = t.TypeOf<typeof updateResource>
