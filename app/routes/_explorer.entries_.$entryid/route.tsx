import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { collectionResource } from '~/api-resources/collection'
import { commentResource } from '~/api-resources/comment'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { workResource } from '~/api-resources/work'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { EntryPage } from './entry-page'
import { renderPageContent } from './render-page-content'

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
  const response = await fetch(`http://views:44002/entries/${params.entryid}?include=collection,comments,work`)
  const value = await response.json()
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
  const entry = pipe(
    useLoaderData<unknown>(),
    parse(entryResponse),
  )
  return (
    <WithFeedLayout pageContent={renderPageContent(new EntryPage(entry))} />
  )
}

