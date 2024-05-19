import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import * as api from '~/api'
import { Card } from '~/components/card'
import { SubmitButton, TextArea, TextField } from '~/components/forms'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  await api.createCommunity(formData)
  return redirect('/collections')
}

const SetUpCommunity: FC = () => {
  const fetcher = useFetcher()
  return (
    <div className='container mx-auto my-12 h-full overflow-hidden'>
      <Card>
        <h3 className='font-semibold mb-6'>Let&apos;s get your community set up</h3>
        <fetcher.Form method="post">
          <TextField label='Name' attr='name' />
          <TextField label='Affiliation' attr='affiliation' />
          <TextArea label='Overview' attr='overview' />
          <SubmitButton label='Save' />
        </fetcher.Form>
      </Card>
    </div>
  )
}

export default SetUpCommunity

