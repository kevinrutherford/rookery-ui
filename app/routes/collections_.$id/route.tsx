import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import { v4 } from 'uuid'
import { collectionResource } from '~/api-resources/collection'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { Collection } from './collection'
import { renderPageContent } from './render-page-content'

const collectionResponse = t.type({
  data: collectionResource,
})

type CollectionWithEntries = {
  type: 'Collection',
  data: Collection,
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`http://views:44002/collections/${params.id}`)
  const value: CollectionWithEntries = await response.json()
  console.log('>>>>>', value)
  return pipe(
    value,
    collectionResponse.decode,
    E.getOrElseW((errors) => {
      throw new Error(formatValidationErrors(errors).join('\n'))
    }),
    (res) => res.data,
    json,
  )
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

