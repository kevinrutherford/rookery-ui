/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { v4 } from 'uuid'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { Collection } from './collection'
import { renderPageContent } from './render-page-content'

type CollectionResponse = {
  type: 'Collection',
  data: Collection,
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/collections/${params.id}`)
  const value: CollectionResponse = await response.json()
  return json(value.data)
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const response = await fetch('http://commands:44001/entries', {
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

