import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { commentResource } from '~/api-resources/comment'
import { entryResource } from '~/api-resources/entry'
import { loadAndParse } from '~/api-resources/load-and-parse'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { EntryPage } from './entry-page'
import { renderPageContent } from './render-page-content'

const collectionResource = t.type({
  type: t.literal('collection'),
  id: t.string,
  attributes: t.type({
    name: t.string,
    description: t.string,
    handle: t.string,
  }),
})

const workResource = t.type({
  type: t.literal('work'),
  id: t.string,
})

const entryResponse = t.type({
  data: entryResource,
  included: t.array(t.union([
    collectionResource,
    commentResource,
    workResource,
  ])),
})

export type EntryResponse = t.TypeOf<typeof entryResponse>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await loadAndParse(
    `http://views:44002/entries/${params.entryid}?include=collection,comments,work`,
    entryResponse,
  )
  return json(response)
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

