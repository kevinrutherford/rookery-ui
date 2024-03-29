import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { FeedEvent } from '~/components/feed-event'
import { renderFeed } from '~/components/render-feed'

type AboutResponse = {
  type: 'About',
  data: ReadonlyArray<FeedEvent>,
}

export const loader = async () => {
  const response = await fetch('http://views:44002/timelines/local')
  const value: AboutResponse = await response.json()
  return json(value.data)
}

export const LocalTimeline = () => {
  const fetcher = useFetcher<typeof loader>()

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetcher.state === 'idle') {
        fetcher.load('/localtimeline')
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [fetcher])

  return fetcher.data ? renderFeed(fetcher.data) : <p>Loading...</p>
}

