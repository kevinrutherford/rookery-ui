import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData  } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { memberResource } from '~/api-resources/member'
import { parse } from '~/api-resources/parse'
import { Card } from '~/components/card'
import { authenticator } from '~/services/auth.server'

const memberResponse = t.type({
  member: t.type({
    data: memberResource,
  }),
  authenticatedUser: t.boolean,
})

export type MemberResponse = t.TypeOf<typeof memberResponse>['member']

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.memberid, 'memberid must be supplied')
  const member = await api.fetchMember(params.memberid, request)
  const user = await authenticator.isAuthenticated(request)
  return json({
    member,
    authenticatedUser: user !== null,
  })
}

export default function CollectionDetails() {
  const response = pipe(
    useLoaderData<unknown>(),
    parse(memberResponse),
  )
  const profile = response.member.data.attributes

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-row gap-4 bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <img
          className='w-1/4 rounded-full inline'
          src={profile.avatar_url} />
        <div>
          <p className='text-4xl font-semibold'>{profile.display_name}</p>
          <p className='text-2xl mb-8 text-slate-400 font-semibold'>@{profile.username}</p>
          <p>Following: 0</p>
        </div>
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

