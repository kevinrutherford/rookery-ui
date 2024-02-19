import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { WithFeedLayout } from '~/components/with-feed-layout';
import { CollectionMember } from './collection-member';
import { renderPageContent } from './render-page-content';

type CollectionMemberResponse = {
  type: 'CollectionMember',
  data: CollectionMember,
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://backend:44002/members/${params.memberid}`);
  const value: CollectionMemberResponse = await response.json();
  return json(value.data);
};

export default function CollectionDetails() {
  const member = useLoaderData<typeof loader>();
  return (
    <WithFeedLayout pageContent={renderPageContent(member)} />
  );
}

