import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { SubmitButton, TextArea, TextField } from '~/components/forms'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await fetch('http://commands:44001/community', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      id: 'local-community',
      overview: updates.overview.toString().split('\n'),
    }),
  })
  return redirect('/collections')
}

const SetUpCommunity: FC = () => {
  const fetcher = useFetcher()
  return (
    <Card>
      <h3 className='font-semibold mb-6'>Let&apos;s get your community set up</h3>
      <fetcher.Form method="post">
        <TextField label='Name' attr='name' />
        <TextField label='Affiliation' attr='affiliation' />
        <TextArea label='Overview' attr='overview' />
        <SubmitButton label='Save' />
      </fetcher.Form>
    </Card>
  )
}

export default SetUpCommunity

