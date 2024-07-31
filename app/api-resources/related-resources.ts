import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { MemberResource } from '~/api-resources/member'
import { WorkResource } from '~/api-resources/work'

type AnyResource =
  | CommunityResource
  | EntryResource
  | MemberResource
  | WorkResource

export type RelatedResources = ReadonlyArray<AnyResource>

