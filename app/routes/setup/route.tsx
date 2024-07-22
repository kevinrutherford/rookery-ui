import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import * as api from '~/api'
import { Card } from '~/components/card'
import { Container } from '~/components/container'
import { SubmitButton, TextArea, TextField } from '~/components/forms'

export const action = async ({ request }: ActionFunctionArgs) => {
  await api.createCommunity(request)
  return redirect('/collections')
}

const SetUpCommunity: FC = () => {
  const fetcher = useFetcher()
  return (
    <Container>
      <Card>
        <h3 className='font-semibold mb-6'>Let&apos;s get your community set up</h3>
        <fetcher.Form method='post'>
          <TextField label='Name' attr='name' />
          <TextField label='Affiliation' attr='affiliation' />
          <TextArea label='Overview' attr='overview' />

          <div className='bg-slate-100'></div>
          <div className='bg-gray-100'></div>
          <div className='bg-zinc-100'></div>
          <div className='bg-neutral-100'></div>
          <div className='bg-stone-100'></div>
          <div className='bg-red-100'></div>
          <div className='bg-orange-100'></div>
          <div className='bg-amber-100'></div>
          <div className='bg-yellow-100'></div>
          <div className='bg-lime-100'></div>
          <div className='bg-green-100'></div>
          <div className='bg-emerald-100'></div>
          <div className='bg-teal-100'></div>
          <div className='bg-cyan-100'></div>
          <div className='bg-sky-100'></div>
          <div className='bg-blue-100'></div>
          <div className='bg-indigo-100'></div>
          <div className='bg-violet-100'></div>
          <div className='bg-purple-100'></div>
          <div className='bg-fuschia-100'></div>
          <div className='bg-pink-100'></div>
          <div className='bg-rose-100'></div>

          <div className='bg-slate-200'></div>
          <div className='bg-gray-200'></div>
          <div className='bg-zinc-200'></div>
          <div className='bg-neutral-200'></div>
          <div className='bg-stone-200'></div>
          <div className='bg-red-200'></div>
          <div className='bg-orange-200'></div>
          <div className='bg-amber-200'></div>
          <div className='bg-yellow-200'></div>
          <div className='bg-lime-200'></div>
          <div className='bg-green-200'></div>
          <div className='bg-emerald-200'></div>
          <div className='bg-teal-200'></div>
          <div className='bg-cyan-200'></div>
          <div className='bg-sky-200'></div>
          <div className='bg-blue-200'></div>
          <div className='bg-indigo-200'></div>
          <div className='bg-violet-200'></div>
          <div className='bg-purple-200'></div>
          <div className='bg-fuschia-200'></div>
          <div className='bg-pink-200'></div>
          <div className='bg-rose-200'></div>

          <div className='bg-slate-400'></div>
          <div className='bg-gray-400'></div>
          <div className='bg-zinc-400'></div>
          <div className='bg-neutral-400'></div>
          <div className='bg-stone-400'></div>
          <div className='bg-red-400'></div>
          <div className='bg-orange-400'></div>
          <div className='bg-amber-400'></div>
          <div className='bg-yellow-400'></div>
          <div className='bg-lime-400'></div>
          <div className='bg-green-400'></div>
          <div className='bg-emerald-400'></div>
          <div className='bg-teal-400'></div>
          <div className='bg-cyan-400'></div>
          <div className='bg-sky-400'></div>
          <div className='bg-blue-400'></div>
          <div className='bg-indigo-400'></div>
          <div className='bg-violet-400'></div>
          <div className='bg-purple-400'></div>
          <div className='bg-fuschia-400'></div>
          <div className='bg-pink-400'></div>
          <div className='bg-rose-400'></div>

          <div className='bg-slate-500'></div>
          <div className='bg-gray-500'></div>
          <div className='bg-zinc-500'></div>
          <div className='bg-neutral-500'></div>
          <div className='bg-stone-500'></div>
          <div className='bg-red-500'></div>
          <div className='bg-orange-500'></div>
          <div className='bg-amber-500'></div>
          <div className='bg-yellow-500'></div>
          <div className='bg-lime-500'></div>
          <div className='bg-green-500'></div>
          <div className='bg-emerald-500'></div>
          <div className='bg-teal-500'></div>
          <div className='bg-cyan-500'></div>
          <div className='bg-sky-500'></div>
          <div className='bg-blue-500'></div>
          <div className='bg-indigo-500'></div>
          <div className='bg-violet-500'></div>
          <div className='bg-purple-500'></div>
          <div className='bg-fuschia-500'></div>
          <div className='bg-pink-500'></div>
          <div className='bg-rose-500'></div>

          <SubmitButton label='Save' />
        </fetcher.Form>
      </Card>
    </Container>
  )
}

export default SetUpCommunity

