import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { FC, useEffect } from 'react'
import * as api from '~/api'
import { accountResource } from '~/api-resources/account'
import { communityResource } from '~/api-resources/community'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { updateResource } from '~/api-resources/update'
import { workResource } from '~/api-resources/work'
import { renderFeed } from '~/components/render-feed'
import { TimelinePage } from '~/components/timeline-page'

const federatedTimelineResponse = t.type({
  data: t.array(updateResource),
  included: t.array(t.union([
    accountResource,
    communityResource,
    entryResource,
    workResource,
  ])),
})

export type LocalTimelineResponse = t.TypeOf<typeof federatedTimelineResponse>

export const loader = async ({ request }: LoaderFunctionArgs) => { // SMELL -- duplicated with all other feeds
  const value = await api.fetchTimeline('federated', request)
  return json(value)
}

export const FederatedTimeline: FC = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => { // SMELL -- duplicated with the other feeds
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

