import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { entryResource } from '~/api-resources/entry'
import { loadAndParse } from '~/api-resources/load-and-parse'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { collectionResource } from '../collections/route'
import { renderPageContent } from './render-page-content'

const collectionResponse = t.type({
  data: collectionResource,
  included: t.array(entryResource),
})

export type CollectionResponse = t.TypeOf<typeof collectionResponse>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await loadAndParse(
    `http://views:44002/collections/${params.id}?include=entries,entries.work`,
    collectionResponse,
  )
  return json(response)
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
  const collection = useLoaderData<typeof loader>()
  return (
    <WithFeedLayout pageContent={renderPageContent(collection)} />
  )
}

