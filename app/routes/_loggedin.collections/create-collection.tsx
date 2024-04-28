import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { SubmitButton, TextArea, TextField } from '~/components/forms'

export const CreateCollection: FC = () => {
  const fetcher = useFetcher()
  return (
    <Card>
      <h3 className='font-semibold mb-6'>Create a new collection:</h3>
      <fetcher.Form method="post" action="/collections" className="w-full">
        <TextField label='Name' attr='name' />
        <TextArea label='Description' attr='description' />
        <TextField label='Handle' attr='handle' />
        <SubmitButton label='Create' />
      </fetcher.Form>
    </Card>
  )
}

