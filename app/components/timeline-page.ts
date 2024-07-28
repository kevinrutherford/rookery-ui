import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { MemberResource } from '~/api-resources/member'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { LocalTimelineResponse } from '~/routes/localtimeline/route'

export class TimelinePage {
  readonly updates: ReadonlyArray<UpdateResource>
  readonly includes: ReadonlyArray<MemberResource | CommunityResource | EntryResource | WorkResource>
  readonly community: O.Option<CommunityResource>

  constructor(response: LocalTimelineResponse) {
    this.updates = response.data
    this.includes = response.included
    this.community = pipe(
      response.included,
      RA.filter((inc): inc is CommunityResource => inc.type === 'community'),
      RA.head,
    )
  }

  communityName() {
    return pipe(
      this.community,
      O.getOrElseW(() => { throw new Error('No community included with local timeline') }),
      (community) => community.attributes.name,
    )
  }

}

