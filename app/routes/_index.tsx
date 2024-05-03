import { json, LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node'
import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as t from 'io-ts'
import * as api from '~/api'
import { parse } from '../api-resources/parse'
import { rootResource } from '../api-resources/root'

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
]

const rootResponse = t.type({
  data: rootResource,
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const path = new URL(request.url).pathname
  const data = await api.fetchRoot()
  return pipe(
    data,
    parse(rootResponse),
    (o) => o.data.relationships.community.data,
    O.match(
      () => redirect('/setup'),
      (c) => {
        if (path === '/')
          return redirect('/about')
        return json(c)
      },
    ),
  )
}

export default function Index() {
  return (
    <div className='grow bg-white p-4'>
      <p>Welcome to Rookery!</p>
    </div>
  )
}
