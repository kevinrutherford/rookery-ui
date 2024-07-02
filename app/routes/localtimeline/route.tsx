import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { FC, useEffect } from 'react'
import * as api from '~/api'
import { parse } from '~/api-resources/parse'
import { updateResource } from '~/api-resources/update'
import { renderFeed } from '~/components/render-feed'

const localTimelineResponse = t.type({
  data: t.array(updateResource),
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const value = await api.fetchLocalTimeline(request)
  return json(value)
}

export const LocalTimeline: FC = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetcher.state === 'idle') {
        fetcher.load('/localtimeline')
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [fetcher])

  const timeline = fetcher.data
  if (timeline === undefined)
    return (<p>Loading...</p>)

  return pipe(
    timeline,
    parse(localTimelineResponse),
    (response) => response.data,
    renderFeed,
  )
}

