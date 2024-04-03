import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as t from 'io-ts'
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

export type CollectionResource = t.TypeOf<typeof collectionResource>

type CollectionsResponse = {
  data: ReadonlyArray<CollectionResource>,
}

export const loader = async () => {
  const response = await fetch('http://views:44002/collections')
  const value: CollectionsResponse = await response.json()
  return json(value.data)
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

