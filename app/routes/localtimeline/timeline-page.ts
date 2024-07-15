import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { AccountResource } from '~/api-resources/account'
import { CommunityResource } from '~/api-resources/community'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { LocalTimelineResponse } from './route'

type Identifier = {
  type: string,
  id: string,
}

export class TimelinePage {
  readonly updates: ReadonlyArray<UpdateResource>
  readonly includes: ReadonlyArray<AccountResource | CommunityResource | WorkResource>
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

  included(ref: Identifier) {
    return pipe(
      this.includes,
      RA.filter((inc) => inc.type === ref.type && inc.id === ref.id),
      RA.head,
      O.getOrElseW(() => { throw new Error(`Local timeline expected to include ${JSON.stringify(ref)}`) }),
    )
  }

}

