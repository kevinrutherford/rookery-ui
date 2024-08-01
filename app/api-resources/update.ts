import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { collectionIdentifier } from './collection'
import { communityIdentifier } from './community'
import { entryIdentifier } from './entry'
import { memberIdentifier } from './member'
import { workIdentifier } from './work'

const classicUpdate = t.type({
  type: t.literal('update'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
    action: t.string,
    content: t.string,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
  }),
})

const updateCollectionCreated = t.type({
  type: t.literal('update:collection-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    collection: t.type({ data: collectionIdentifier }),
  }),
})

export type UpdateCollectionCreated = t.TypeOf<typeof updateCollectionCreated>

const updateCommentCreated = t.type({
  type: t.literal('update:comment-created'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    entry: t.type({ data: entryIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

export type UpdateCommentCreated = t.TypeOf<typeof updateCommentCreated>

const updateCommunityCreated = t.type({
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

export type UpdateCommunityCreated = t.TypeOf<typeof updateCommunityCreated>

const updateWorkNotFound = t.type({
  type: t.literal('update:work-not-found'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

export type UpdateWorkNotFound = t.TypeOf<typeof updateWorkNotFound>

export const updateResource = t.union([
  classicUpdate,
  updateCollectionCreated,
  updateCommentCreated,
  updateCommunityCreated,
  updateWorkNotFound,
])

export type UpdateResource = t.TypeOf<typeof updateResource>

