import { json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { fakeFeedData } from '~/components/fake-feed-data';
import { renderFeed } from '~/components/render-feed';

export const loader = async () => json(fakeFeedData());

export const LocalTimeline = () => {
  const fetcher = useFetcher<typeof loader>();
  const fetcherRef = useRef<typeof fetcher | null>();

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetcherRef.current && fetcherRef.current.state === 'idle') {
        fetcherRef.current.load('/localtimeline');
        console.log(fetcherRef.current);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [fetcher]);

  return fetcher.data ? renderFeed(fetcher.data) : <p>Loading...</p>;
}

