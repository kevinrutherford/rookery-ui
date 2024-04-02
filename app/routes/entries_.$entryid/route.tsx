import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { CollectionResource } from '~/api-resources/collection'
import { EntryResource } from '~/api-resources/entry'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { EntryPageData } from './entry'
import { EntryPage } from './entry-page'
import { renderPageContent } from './render-page-content'

const commentResource = t.type({
  type: t.literal('comment'),
  id: t.string,
  attributes: t.type({
    content: t.string,
  }),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CommentResource = t.TypeOf<typeof commentResource>

type EntryResponse = {
  data: EntryResource,
  included: ReadonlyArray<CollectionResource>,
}

const toEntryPageData = (doc: EntryResponse): EntryPageData => ({
  ...doc.data,
  collection: {
    id: doc.included[0].id,
    name: doc.included[0].attributes.name,
  },
})

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/entries/${params.entryid}?include=collection,comments,work`)
  const value: EntryResponse = await response.json()
  return json(toEntryPageData(value))
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

