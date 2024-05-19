import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import * as api from '~/api'
import { collectionResource  } from '~/api-resources/collection'
import { parse } from '~/api-resources/parse'
import { authenticator } from '~/services/auth.server'
import { CollectionCard } from './collection-card'
import { CreateCollection } from './create-collection'

const collectionsResponse = t.type({
  collections: t.type({
    data: t.array(collectionResource),
  }),
  authenticatedUser: t.boolean,
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const collections = await api.fetchAllCollections()
  const user = await authenticator.isAuthenticated(request)
  return json({
    collections,
    authenticatedUser: user !== null,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  await api.createCollection(request)
  return redirect('/collections')
}

export default function Collections() {
  const data = pipe(
    useLoaderData<unknown>(),
    parse(collectionsResponse),
  )
  return (
    <div className='grow'>
      <ul className='overflow-y-auto'>
        { data.collections.data.map((collection) => (
          <li key={collection.attributes.name} className='mb-4'>
            <CollectionCard collection={collection} />
          </li>
        ))
        }
      </ul>
      { data.authenticatedUser && <CreateCollection /> }
    </div>
  )
}

