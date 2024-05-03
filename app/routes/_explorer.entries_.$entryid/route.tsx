import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import { createComment } from '~/api/create-comment.server'
import { fetchEntry } from '~/api/fetch-entry.server'
import { collectionResource } from '~/api-resources/collection'
import { commentResource } from '~/api-resources/comment'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { workResource } from '~/api-resources/work'
import { WithFeedLayout } from '~/components/with-feed-layout'
import { EntryPage } from './entry-page'
import { renderPageContent } from './render-page-content'

const entryResponse = t.type({
  data: entryResource,
  included: t.array(t.union([
    collectionResource,
    commentResource,
    workResource,
  ])),
})

export type EntryResponse = t.TypeOf<typeof entryResponse>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.entryid, 'entryid must be supplied')
  const value = await fetchEntry(params.entryid)
  return json(value)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  await createComment(formData)
  return redirect(`/entries/${formData.get('entryId')}`)
}

export default function CollectionDetails() {
  const entry = pipe(
    useLoaderData<unknown>(),
    parse(entryResponse),
  )
  return (
    <WithFeedLayout pageContent={renderPageContent(new EntryPage(entry))} />
  )
}

