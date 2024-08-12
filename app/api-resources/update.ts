import * as t from 'io-ts'
import { updateCollectionCreated } from './updates/collection-created'
import { inboxUpdateCommentCreated, updateCommentCreated } from './updates/comment-created'
import { updateCommunityCreated } from './updates/community-created'
import { updateDoiEntered } from './updates/doi-entered'
import { updateFrontMatterFetched } from './updates/front-matter-fetched'
import { updateWorkNotFound } from './updates/work-not-found'

export type UpdateCollectionCreated = t.TypeOf<typeof updateCollectionCreated>

export type UpdateCommentCreated = t.TypeOf<typeof updateCommentCreated>
export type InboxUpdateCommentCreated = t.TypeOf<typeof inboxUpdateCommentCreated>

export type UpdateCommunityCreated = t.TypeOf<typeof updateCommunityCreated>

export type UpdateDoiEntered = t.TypeOf<typeof updateDoiEntered>

export type UpdateFrontMatterFetched = t.TypeOf<typeof updateFrontMatterFetched>

export type UpdateWorkNotFound = t.TypeOf<typeof updateWorkNotFound>

export const updateResource = t.union([
  updateCollectionCreated,
  updateCommentCreated,
  inboxUpdateCommentCreated,
  updateCommunityCreated,
  updateDoiEntered,
  updateFrontMatterFetched,
  updateWorkNotFound,
])

export type UpdateResource = t.TypeOf<typeof updateResource>

