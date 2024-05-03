import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import * as api from '~/api'
import { collectionResource } from '~/api-resources/collection'
import { parse } from '~/api-resources/parse'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { renderPageContent } from './render-page-content'

const collectionsResponse = t.type({
  data: t.array(collectionResource),
})

export const loader = async () => {
  const collections = await api.fetchAllCollections()
  return json(collections)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  await api.createCollection(formData)
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

