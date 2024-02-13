import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Collection } from './collection';
import { WithFeedLayout } from '~/components/with-feed-layout';
import { renderPageContent } from './render-page-content';

type CollectionsResponse = {
  type: 'Collections',
  data: ReadonlyArray<Collection>,
};

export const loader = async () => {
  const response = await fetch('http://backend:44002/collections');
  const value: CollectionsResponse = await response.json();
  return json(value.data);
};

export default function Collections() {
  const collections = useLoaderData<typeof loader>();
  return (
    <WithFeedLayout pageContent={renderPageContent(collections)} />
  );
}

