import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { MemberResource } from '~/api-resources/member'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { LocalTimelineResponse } from '~/routes/localtimeline/route'

export class TimelinePage {
  readonly updates: ReadonlyArray<UpdateResource>
  readonly includes: ReadonlyArray<MemberResource | CommunityResource | EntryResource | WorkResource>

  constructor(response: LocalTimelineResponse) {
    this.updates = response.data
    this.includes = response.included
  }

}

