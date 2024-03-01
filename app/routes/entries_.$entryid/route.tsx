import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { WithFeedLayout } from '~/components/with-feed-layout';
import { Entry } from './entry';
import { renderPageContent } from './render-page-content';

type EntryResponse = {
  type: 'Entry',
  data: Entry,
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/entries/${params.entryid}`);
  const value: EntryResponse = await response.json();
  return json(value.data);
};

export default function CollectionDetails() {
  const entry = useLoaderData<typeof loader>();
  return (
    <WithFeedLayout pageContent={renderPageContent(entry)} />
  );
}

