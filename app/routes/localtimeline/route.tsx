import { json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { fakeFeedData } from '~/components/fake-feed-data';
import { renderFeed } from '~/components/render-feed';

export const loader = async () => json(fakeFeedData());

export const LocalTimeline = () => {
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetcher.state === 'idle') {
        fetcher.load('/localtimeline');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [fetcher]);

  return fetcher.data ? renderFeed(fetcher.data) : <p>Loading...</p>;
}

