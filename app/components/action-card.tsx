import { ReactNode } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { AccountResource } from '~/api-resources/account'
import { Card } from '~/components/card'

type Props = {
  actor: AccountResource,
  timestamp: Date,
  children: ReactNode,
}

export default function ActionCard(props: Props) {
  return (
    <Card>
      <div className='flex flex-row gap-4'>
        <img
          className='h-10 w-10 rounded-full'
          src={props.actor.attributes.avatar_url} />
        <div className='w-full'>
          <div className='flex justify-between mb-2 text-slate-500'>
            <div>
              <span className='font-semibold mr-2'>{props.actor.attributes.display_name}</span>
              <span className='mr-4'>@{props.actor.attributes.username}</span>
            </div>
            <ReactTimeAgo date={props.timestamp} timeStyle='twitter' />
          </div>
          { props.children }
        </div>
      </div>
    </Card>
  )
}

