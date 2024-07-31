import * as t from 'io-ts'
import { collectionResource } from './collection'
import { commentResource } from './comment'
import { communityResource } from './community'
import { entryResource } from './entry'
import { memberResource } from './member'
import { workResource } from './work'

export const relatedResources = t.array(t.union([
  collectionResource,
  commentResource,
  communityResource,
  entryResource,
  memberResource,
  workResource,
]))

export type RelatedResources = t.TypeOf<typeof relatedResources>

