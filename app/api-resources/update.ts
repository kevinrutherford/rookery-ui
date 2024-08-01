import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { collectionIdentifier } from './collection'
import { communityIdentifier } from './community'
import { entryIdentifier } from './entry'
import { memberIdentifier } from './member'
import { workIdentifier } from './work'

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

const updateDoiEntered = t.type({
  type: t.literal('update:doi-entered'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    collection: t.type({ data: collectionIdentifier }),
    entry: t.type({ data: entryIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

export type UpdateDoiEntered = t.TypeOf<typeof updateDoiEntered>

const updateWorkFound = t.type({
  type: t.literal('update:front-matter-fetched'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

export type UpdateWorkFound = t.TypeOf<typeof updateWorkFound>

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
  updateCollectionCreated,
  updateCommentCreated,
  updateCommunityCreated,
  updateDoiEntered,
  updateWorkFound,
  updateWorkNotFound,
])

export type UpdateResource = t.TypeOf<typeof updateResource>

