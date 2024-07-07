import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link,useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import ReactTimeAgo from 'react-time-ago'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { collectionResource } from '~/api-resources/collection'
import { commentResource } from '~/api-resources/comment'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { workResource } from '~/api-resources/work'
import { Card } from '~/components/card'
import { authenticator } from '~/services/auth.server'
import { AddComment } from './add-comment'
import { EntryPage } from './entry-page'
import { Replies } from './replies'

const entryResponse = t.type({
  entry: t.type({
    data: entryResource,
    included: t.array(t.union([
      collectionResource,
      commentResource,
      workResource,
    ])),
  }),
  authenticatedUser: t.boolean,
})

export type EntryResponse = t.TypeOf<typeof entryResponse>['entry']

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.entryid, 'entryid must be supplied')
  const entry = await api.fetchEntry(params.entryid, request)
  const user = await authenticator.isAuthenticated(request)
  return json({
    entry,
    authenticatedUser: user !== null,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => { // SMELL: move to AddComment?
  const formData = await request.formData()
  await api.createComment(request)
  return redirect(`/entries/${formData.get('entryId')}`) // SMELL: HATEOAS here?
}

export default function CollectionDetails() {
  const response = pipe(
    useLoaderData<unknown>(),
    parse(entryResponse),
  )
  const entry = new EntryPage(response.entry)

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <p className='mb-4 font-semibold'>{entry.title()}</p>
        <div className='text-sm text-slate-500 flex justify-between mb-20'>
          <div>
            {entry.isPaper() && (
              <a className='block hover:underline'
                href={`https://doi.org/${entry.doi()}`}
                target='_blank' rel="noreferrer"
              >
                Original document <ArrowTopRightOnSquareIcon className='h-5 w-5 pl-1 pb-1 inline' />
              </a>
            )}
          </div>
          <div>
            Added to <Link to={`/collections/${entry.collectionId()}`} className='inline hover:underline'>
              {entry.collectionName()}
            </Link> <ReactTimeAgo date={entry.addedAt()} />
          </div>
        </div>
        <div className='overflow-y-auto'>
          <Replies comments={entry.comments()} />
        </div>
      </div>
      { response.authenticatedUser && <AddComment entryId={entry.id()} /> }
    </div>
  )

}

export function ErrorBoundary() {
  return (
    <Card>
      <p>Something went wrong!</p>
    </Card>
  )
}

