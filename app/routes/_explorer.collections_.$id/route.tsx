import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { collectionResource } from '~/api-resources/collection'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { workResource } from '~/api-resources/work'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { renderPageContent } from './render-page-content'

const collectionResponse = t.type({
  data: collectionResource,
  included: t.array(t.union([entryResource, workResource])),
})

export type CollectionResponse = t.TypeOf<typeof collectionResponse>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/collections/${params.id}?include=entries,entries.work`)
  const value = await response.json()
  return json(value)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: v4(),
    }),
  })
  return redirect(`/collections/${updates['collectionId']}`)
}

export default function CollectionDetails() {
  const collection = pipe(
    useLoaderData<unknown>(),
    parse(collectionResponse),
  )
  return (
    <WithFeedLayout pageContent={renderPageContent(collection)} />
  )
}

