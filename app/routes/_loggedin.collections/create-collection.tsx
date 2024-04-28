import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { TextField } from '~/components/forms'
import { SubmitButton } from '~/components/forms/submit-button'

export const CreateCollection: FC = () => {
  const fetcher = useFetcher()
  return (
    <Card>
      <h3 className='font-semibold mb-6'>Create a new collection:</h3>
      <fetcher.Form method="post" action="/collections" className="w-full">
        <TextField label='Name' attr='name' />
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label className="block text-slate-500 md:text-right md:mb-0 pr-4" htmlFor="description">
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              id="description"
              name="description"
              className="bg-slate-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <TextField label='Handle' attr='handle' />
        <SubmitButton label='Create' />
      </fetcher.Form>
    </Card>
  )
}

