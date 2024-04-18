import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { communityResource } from '~/api-resources/community'
import { parse } from '~/api-resources/parse'
import { renderPageContent } from './render-page-content'

const communityResponse = t.type({
  data: communityResource,
})

export const loader = async () => {
  const response = await fetch('http://views:44002/community')
  const value = await response.json()
  return json(value)
}

export default function About() {
  const community = pipe(
    useLoaderData<unknown>(),
    parse(communityResponse),
  )
  return renderPageContent(community.data)
}

