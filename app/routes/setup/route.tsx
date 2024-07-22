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
        <fetcher.Form method="post">
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
          <SubmitButton label='Save' />
        </fetcher.Form>
      </Card>
    </Container>
  )
}

export default SetUpCommunity

