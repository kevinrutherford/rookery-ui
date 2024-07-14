import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { FC, useEffect } from 'react'
import { communityResource } from '~/api-resources/community'
import { parse } from '~/api-resources/parse'
import { updateResource } from '~/api-resources/update'
import { workResource } from '~/api-resources/work'
import { renderFeed } from './render-feed'
import { TimelinePage } from './timeline-page'

const federatedTimelineResponse = t.type({
  data: t.array(updateResource),
  included: t.array(t.union([
    communityResource,
    workResource,
  ])),
})

export type LocalTimelineResponse = t.TypeOf<typeof federatedTimelineResponse>

export const loader = async () => json({
  data: [],
  included: [],
})

export const FederatedTimeline: FC = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => {
    if (fetcher.state === 'idle')
      fetcher.load('/federatedtimeline')
    const interval = setInterval(() => {
      if (fetcher.state === 'idle')
        fetcher.load('/federatedtimeline')
    }, 5000)
    return () => clearInterval(interval)
  }, [fetcher])

  const timeline = fetcher.data
  if (timeline === undefined)
    return (<p>Loading...</p>)

  const response = pipe(
    timeline,
    parse(federatedTimelineResponse),
  )

  const page = new TimelinePage(response)

  return renderFeed(page)
}

