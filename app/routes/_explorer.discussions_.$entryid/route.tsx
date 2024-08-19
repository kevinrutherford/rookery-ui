import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import ReactTimeAgo from 'react-time-ago'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { entryResource } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { relatedResources } from '~/api-resources/related-resources'
import { Card } from '~/components/card'
import { InternalLink } from '~/components/internal-link'
import { PaperTitle } from '~/components/paper-title'
import { Subsection } from '~/components/subsection'
import { authenticator } from '~/services/auth.server'
import { AddComment } from './add-comment'
import { EntryPage } from './entry-page'
import { Replies } from './replies'

const entryResponse = t.type({
  entry: t.type({
    data: entryResource,
    included: relatedResources,
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
  await api.createComment(formData, request)
  return redirect(`/discussions/${formData.get('entryId')}`) // SMELL: HATEOAS here?
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
        <p className='mb-4'>
          <PaperTitle text={entry.title()} />
        </p>
        <div className='text-sm flex justify-between'>
          <InternalLink to={`/works/${encodeURIComponent(entry.work.id)}`}>
            Authors, abstract, history, etc
          </InternalLink>
          <div>
            Added to collection <InternalLink to={`/collections/${entry.collectionId()}`}>
              {entry.collectionName()}
            </InternalLink> <ReactTimeAgo date={entry.addedAt()} />
          </div>
        </div>
      </div>
      <Subsection title='Conversation'>
        <div className='flex flex-col overflow-hidden'>
          <div className='overflow-y-auto'>
            <Replies comments={entry.comments()} resources={response.entry.included} />
          </div>
        </div>
      </Subsection>
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

