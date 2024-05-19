import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import * as t from 'io-ts'
import invariant from 'tiny-invariant'
import * as api from '~/api'
import { CollectionResource,collectionResource  } from '~/api-resources/collection'
import { EntryResource,entryResource  } from '~/api-resources/entry'
import { parse } from '~/api-resources/parse'
import { WorkResource,workResource  } from '~/api-resources/work'
import { AddEntry } from './add-entry'
import { EntryCard } from './entry-card'

const collectionResponse = t.type({
  data: collectionResource,
  included: t.array(t.union([entryResource, workResource])),
})

export type CollectionResponse = t.TypeOf<typeof collectionResponse>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, 'params.id is required')
  const collection = await api.fetchCollection(params.id)
  return json(collection)
}

export const action = async ({ request }: ActionFunctionArgs) => { // SMELL: not clear where the form is
  const formData = await request.formData()
  await api.createEntry(request)
  return redirect(`/collections/${formData.get('collectionId')}`) // SMELL: HATEOAS here?
}

type EnteredWork = {
  entry: EntryResource,
  work: WorkResource,
}

class CollectionPage {
  readonly collection: CollectionResource
  readonly includedEntries: ReadonlyArray<EnteredWork>

  constructor(response: CollectionResponse) {
    this.collection = response.data
    this.includedEntries = pipe(
      response.included,
      RA.filter((inc): inc is EntryResource => inc.type === 'entry'),
      RA.map((entry) => ({
        entry,
        work: pipe(
          response.included,
          RA.filter((inc): inc is WorkResource => inc.type === 'work'),
          RA.filter((work) => work.id === entry.relationships.work.data.id),
          RA.head,
          O.getOrElseW(() => { throw new Error('Work for entry not found') }),
        ),
      })),
    )
  }

  description() {
    return this.collection.attributes.description
  }

  entries() {
    return this.includedEntries
  }

  id() {
    return this.collection.id
  }

  name() {
    return this.collection.attributes.name
  }
}

export default function CollectionDetails() {
  const collection = pipe(
    useLoaderData<unknown>(),
    parse(collectionResponse),
  )
  const page = new CollectionPage(collection)

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
        <p className='font-semibold'>{page.name()}</p>
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
      <AddEntry collectionId={page.id()} />
    </div>
  )
}

