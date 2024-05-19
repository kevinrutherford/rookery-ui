import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
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
  invariant(params.id, 'params.id is required')
  const collection = await api.fetchCollection(params.id)
  return json(collection)
}

export const action = async ({ request }: ActionFunctionArgs) => { // SMELL: not clear where the form is
  const formData = await request.formData()
  await api.createEntry(request)
  return redirect(`/collections/${formData.get('collectionId')}`) // SMELL: HATEOAS here?
}

export default function CollectionDetails() {
  const collection = pipe(
    useLoaderData<unknown>(),
    parse(collectionResponse),
  )
  return (
    <WithFeedLayout pageContent={renderPageContent(collection)} /> // SMELL: do this with a proper layout?
  )
}

