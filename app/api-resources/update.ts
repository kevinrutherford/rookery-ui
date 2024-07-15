import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { accountIdentifier } from './account'
import { communityIdentifier } from './community'
import { workIdentifier } from './work'

const classicUpdate = t.type({
  type: t.literal('update'),
  id: t.string,
  attributes: t.type({
    actor: t.string,
    occurred_at: tt.DateFromISOString,
    action: t.string,
    content: t.string,
  }),
  relationships: t.type({
    actor: t.type({ data: accountIdentifier }),
  }),
})

const updateCommunityCreated = t.type({
  type: t.literal('update:community-created'),
  id: t.string,
  attributes: t.type({
    actor: t.string,
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: accountIdentifier }),
    community: t.type({ data: tt.optionFromNullable(communityIdentifier) }),
  }),
})

const updateWorkNotFound = t.type({
  type: t.literal('update:work-not-found'),
  id: t.string,
  attributes: t.type({
    actor: t.string,
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: accountIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

export const updateResource = t.union([
  classicUpdate,
  updateCommunityCreated,
  updateWorkNotFound,
])

export type UpdateResource = t.TypeOf<typeof updateResource>

