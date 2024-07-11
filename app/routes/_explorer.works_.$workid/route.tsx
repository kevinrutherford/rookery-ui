import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { parse } from '~/api-resources/parse'
import { WorkResource, workResource } from '~/api-resources/work'
import { Card } from '~/components/card'

const workResponse = t.type({
  data: workResource,
})

const header = (work: WorkResource) => {
  switch (work.attributes.crossrefStatus) {
    case 'not-determined':
      return (
        <>
          <p className='mb-4 font-semibold'>{work.attributes.doi}</p>
          <p>Searching...</p>
        </>
      )
    case 'not-found':
      return (
        <>
          <p className='mb-4 font-semibold'>{work.attributes.doi}</p>
          <p>This doesn&apos;t seem to be a valid DOI.</p>
        </>
      )
    case 'found':
      return (
        <>
          <p className='mb-4 font-semibold'>{work.attributes.title}</p>
          <p className='mb-4'>{work.attributes.authors.join(', ')}</p>
          <p className='mb-4 font-semibold'>Abstract</p>
          <p className='mb-4'>{work.attributes.abstract}</p>
        </>
      )
  }
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.workid, 'workid must be supplied')
  const work = await api.fetchWork(params.workid, request)
  return json(work)
}

export default function WorkDetails() {
  const response = pipe(
    useLoaderData<unknown>(),
    parse(workResponse),
  )

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        { header (response.data) }
        <div className='flex justify-between mb-4'>
          <span>DOI: {response.data.attributes.doi}</span>
          <a className='block hover:underline'
            href={`https://doi.org/${response.data.attributes.doi}`}
            target='_blank' rel="noreferrer"
          >
            Original document <ArrowTopRightOnSquareIcon className='h-5 w-5 pl-1 pb-1 inline' />
          </a>
        </div>
      </div>
      <p className='font-semibold mb-4'>Conversations</p>
      <Card>
        <div className='flex justify-between'>
          <span>Local collection CHS</span>
          <span>3 comments</span>
        </div>
      </Card>
      <Card>
        <div className='flex justify-between'>
          <span>Hypothes.is</span>
          <span>3 annotations</span>
        </div>
      </Card>
      <Card>
        <div className='flex justify-between'>
          <span>Sciety</span>
          <span>3 evaluations</span>
        </div>
      </Card>
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

