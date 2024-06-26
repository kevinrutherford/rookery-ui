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
          <SubmitButton label='Save' />
        </fetcher.Form>
      </Card>
    </Container>
  )
}

export default SetUpCommunity

