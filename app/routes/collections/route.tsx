/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CollectionSummary } from './collection-summary'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { renderPageContent } from './render-page-content'
import { v4 } from 'uuid'

type CollectionsResponse = {
  type: 'Collections',
  data: ReadonlyArray<CollectionSummary>,
}

export const loader = async () => {
  const response = await fetch('http://views:44002/collections')
  const value: CollectionsResponse = await response.json()
  return json(value.data)
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const response = await fetch('http://commands:44001/collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: v4(),
    }),
  })
  return redirect('/collections')
}

export default function Collections() {
  const collections = useLoaderData<typeof loader>()
  return (
    <WithFeedLayout pageContent={renderPageContent(collections)} />
  )
}

