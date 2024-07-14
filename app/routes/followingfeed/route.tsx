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

const followingFeedResponse = t.type({
  data: t.array(updateResource),
  included: t.array(t.union([
    communityResource,
    workResource,
  ])),
})

export type LocalTimelineResponse = t.TypeOf<typeof followingFeedResponse>

export const loader = async () => json({
  data: [],
  included: [],
})

export const FollowingFeed: FC = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => {
    if (fetcher.state === 'idle')
      fetcher.load('/followingfeed')
    const interval = setInterval(() => {
      if (fetcher.state === 'idle')
        fetcher.load('/followingfeed')
    }, 5000)
    return () => clearInterval(interval)
  }, [fetcher])

  const timeline = fetcher.data
  if (timeline === undefined)
    return (<p>Loading...</p>)

  const response = pipe(
    timeline,
    parse(followingFeedResponse),
  )

  const page = new TimelinePage(response)

  return renderFeed(page)
}

