import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Collection } from './collection';
import { WithFeedLayout } from '~/components/with-feed-layout';
import { renderPageContent } from './render-page-content';

type CollectionResponse = {
  type: 'Collection',
  data: Collection,
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/collections/${params.id}`);
  const value: CollectionResponse = await response.json();
  return json(value.data);
};

export default function CollectionDetails() {
  const collection = useLoaderData<typeof loader>();
  return (
    <WithFeedLayout pageContent={renderPageContent(collection)} />
  );
}

