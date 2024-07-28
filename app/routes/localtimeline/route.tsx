import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { FC, useEffect } from 'react'
import * as api from '~/api'
import { communityResource } from '~/api-resources/community'
import { entryResource } from '~/api-resources/entry'
import { memberResource } from '~/api-resources/member'
import { parse } from '~/api-resources/parse'
import { updateResource } from '~/api-resources/update'
import { workResource } from '~/api-resources/work'
import { renderFeed } from '~/components/render-feed'
import { TimelinePage } from '~/components/timeline-page'

const localTimelineResponse = t.type({
  data: t.array(updateResource),
  included: t.array(t.union([
    communityResource,
    entryResource,
    memberResource,
    workResource,
  ])),
})

export type LocalTimelineResponse = t.TypeOf<typeof localTimelineResponse>

export const loader = async ({ request }: LoaderFunctionArgs) => { // SMELL -- duplicated with all other feeds
  const value = await api.fetchTimeline('local', request)
  return json(value)
}

export const LocalTimeline: FC = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => { // SMELL -- duplicated with the other feeds
    const interval = setInterval(() => {
      if (fetcher.state === 'idle')
        fetcher.load('/localtimeline')
    }, 5000)
    return () => clearInterval(interval)
  }, [fetcher])

  const timeline = fetcher.data
  if (timeline === undefined)
    return (<p>Loading...</p>)

  const response = pipe(
    timeline,
    parse(localTimelineResponse),
  )

  const page = new TimelinePage(response)

  return renderFeed(page)
}

