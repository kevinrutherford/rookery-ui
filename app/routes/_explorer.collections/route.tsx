import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { fetchAllCollections } from '~/api/fetch-all-collections.server'
import { collectionResource } from '~/api-resources/collection'
import { parse } from '~/api-resources/parse'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { renderPageContent } from './render-page-content'

const collectionsResponse = t.type({
  data: t.array(collectionResource),
})

export const loader = async () => {
  const collections = await fetchAllCollections()
  return json(collections)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: updates.handle,
    }),
  })
  return redirect('/collections')
}

export default function Collections() {
  const collections = pipe(
    useLoaderData<unknown>(),
    parse(collectionsResponse),
  )
  return (
    <WithFeedLayout pageContent={renderPageContent(collections.data)} />
  )
}

