import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { v4 } from 'uuid'
import { CollectionResource } from '~/api-resources/collection'
import { CommentResource } from '~/api-resources/comment'
import { EntryResource } from '~/api-resources/entry'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { EntryPage } from './entry-page'
import { renderPageContent } from './render-page-content'

export type EntryResponse = {
  data: EntryResource,
  included: ReadonlyArray<CollectionResource | CommentResource>,
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/entries/${params.entryid}?include=collection,comments,work`)
  const value: EntryResponse = await response.json()
  return json(value)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: v4(),
    }),
  })
  return redirect(`/entries/${updates['entryId']}`)
}

export default function CollectionDetails() {
  const entry = useLoaderData<typeof loader>()
  return (
    <WithFeedLayout pageContent={renderPageContent(new EntryPage(entry))} />
  )
}

