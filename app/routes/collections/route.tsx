import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
import { loadAndParse } from '~/api-resources/load-and-parse'
import { WithFeedLayout } from '~/components/with-feed-layout'
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

const collectionsResponse = t.type({
  data: t.array(collectionResource),
})

export type CollectionResource = t.TypeOf<typeof collectionResource>

export const loader = async () => {
  const response = await loadAndParse('http://views:44002/collections', collectionsResponse)
  return json(response.data)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  await request.formData()
  return redirect('/collections')
}

export default function Collections() {
  const collections = useLoaderData<typeof loader>()
  return (
    <WithFeedLayout pageContent={renderPageContent(collections)} />
  )
}

