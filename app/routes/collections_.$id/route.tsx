import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
import { v4 } from 'uuid'
import { collectionResource } from '~/api-resources/collection'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { loadAndParse } from './load-and-parse'
import { renderPageContent } from './render-page-content'

const collectionResponse = t.type({
  data: collectionResource,
})

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await loadAndParse(
    `http://views:44002/collections/${params.id}?include=entries,entries.work`,
    collectionResponse,
  )
  return json(response.data)
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

