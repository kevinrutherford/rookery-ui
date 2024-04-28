import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { SubmitButton, TextArea, TextField } from '~/components/forms'

const SetUpCommunity: FC = () => {
  const fetcher = useFetcher()
  return (
    <Card>
      <h3 className='font-semibold mb-6'>Let&apos;s get your community set up</h3>
      <fetcher.Form method="post" action="/community">
        <TextField label='Name' attr='name' />
        <TextField label='Affiliation' attr='affiliation' />
        <TextArea label='Overview' attr='overview' />
        <SubmitButton label='Save' />
      </fetcher.Form>
    </Card>
  )
}

export default SetUpCommunity

