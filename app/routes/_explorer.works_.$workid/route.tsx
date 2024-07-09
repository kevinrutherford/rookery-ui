import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { parse } from '~/api-resources/parse'
import { workResource } from '~/api-resources/work'
import { Card } from '~/components/card'

const workResponse = t.type({
  data: workResource,
})

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
        <p className='mb-4 font-semibold'>{response.data.attributes.doi}</p>
      </div>
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

