import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { FC, useEffect } from 'react'
import * as api from '~/api'
import { parse } from '~/api-resources/parse'
import { relatedResources } from '~/api-resources/related-resources'
import { updateResource } from '~/api-resources/update'
import { Feed } from '~/components/feed'

const localTimelineResponse = t.type({
  data: t.array(updateResource),
  included: relatedResources,
})

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

  return <Feed updates={response.data} related={response.included} />
}

