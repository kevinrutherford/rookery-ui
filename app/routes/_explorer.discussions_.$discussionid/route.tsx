import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import ReactTimeAgo from 'react-time-ago'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { discussionResource } from '~/api-resources/discussion'
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

const discussionResponse = t.type({
  discussion: t.type({
    data: discussionResource,
    included: relatedResources,
  }),
  authenticatedUser: t.boolean,
})

export type EntryResponse = t.TypeOf<typeof discussionResponse>['discussion']

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.discussionid, 'discussionid must be supplied')
  const discussion = await api.fetchDiscussion(params.discussionid, request)
  const user = await authenticator.isAuthenticated(request)
  return json({
    discussion,
    authenticatedUser: user !== null,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => { // SMELL: move to AddComment?
  const formData = await request.formData()
  await api.createComment(formData, request)
  return redirect(`/discussions/${formData.get('discussionId')}`) // SMELL: HATEOAS here?
}

export default function CollectionDetails() {
  const response = pipe(
    useLoaderData<unknown>(),
    parse(discussionResponse),
  )
  const discussion = new EntryPage(response.discussion)

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <p className='mb-4'>
          <PaperTitle text={discussion.title()} />
        </p>
        <div className='text-sm flex justify-between'>
          <InternalLink to={`/works/${encodeURIComponent(discussion.work.id)}`}>
            Authors, abstract, history, etc
          </InternalLink>
          <div>
            Added to collection <InternalLink to={`/collections/${discussion.collectionId()}`}>
              {discussion.collectionName()}
            </InternalLink> <ReactTimeAgo date={discussion.addedAt()} />
          </div>
        </div>
      </div>
      <Subsection title='Conversation'>
        <div className='flex flex-col overflow-hidden'>
          <div className='overflow-y-auto'>
            <Replies comments={discussion.comments()} resources={response.discussion.included} />
          </div>
        </div>
      </Subsection>
      { response.authenticatedUser && <AddComment discussionId={discussion.id()} /> }
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

