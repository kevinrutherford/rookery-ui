import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { collectionResource  } from '~/api-resources/collection'
import { entryResource  } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { workResource  } from '~/api-resources/work'
import { authenticator } from '~/services/auth.server'
import { AddEntry } from './add-entry'
import { CollectionPage } from './collection-page'
import { EntryCard } from './entry-card'

const collectionResponse = t.type({
  collection: t.type({
    data: collectionResource,
    included: t.array(t.union([entryResource, workResource])),
  }),
  authenticatedUser: t.boolean,
})

export type CollectionResponse = t.TypeOf<typeof collectionResponse>['collection']

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.id, 'params.id is required')
  const collection = await api.fetchCollection(params.id)
  const user = await authenticator.isAuthenticated(request)
  return json({
    collection,
    authenticatedUser: user !== null,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => { // SMELL: not clear where the form is
  const formData = await request.formData()
  await api.createEntry(request)
  return redirect(`/collections/${formData.get('collectionId')}`) // SMELL: HATEOAS here?
}

export default function CollectionDetails() {
  const data = pipe(
    useLoaderData<unknown>(),
    parse(collectionResponse),
  )
  const page = new CollectionPage(data.collection)

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <div className='flex justify-between mb-4'>
          <h2 className='font-semibold'>{page.name()}</h2>
          { false && <EyeSlashIcon className='h-5 w-5 pl-1 inline' /> }
        </div>
        <p className='mb-8'>{page.description()}</p>
        <ul className='overflow-y-auto mb-4'>
          { page.entries().map((ew) => (
            <li key={ew.entry.id} className='mb-4'>
              <EntryCard collectionid={page.id()} entry={ew.entry} work={ew.work} />
            </li>
          ))
          }
        </ul>
      </div>
      { data.authenticatedUser && <AddEntry collectionId={page.id()} /> }
    </div>
  )
}

