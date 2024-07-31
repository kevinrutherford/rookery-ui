import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateResource } from '~/api-resources/update'
import { LocalTimelineResponse } from '~/routes/localtimeline/route'

export class TimelinePage {
  readonly updates: ReadonlyArray<UpdateResource>
  readonly includes: RelatedResources

  constructor(response: LocalTimelineResponse) {
    this.updates = response.data
    this.includes = response.included
  }

}

