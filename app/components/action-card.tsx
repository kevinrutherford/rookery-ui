import { ReactNode } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { MemberResource } from '~/api-resources/member'
import { Card } from '~/components/card'
import { InternalLink } from './internal-link'

type Props = {
  actor: MemberResource,
  timestamp: Date,
  children: ReactNode,
}

export default function ActionCard(props: Props) {
  return (
    <Card>
      <div className='flex flex-row gap-4'>
        <InternalLink to={`/members/${props.actor.id}`}>
          <img
            className='h-10 w-10 rounded-full filter grayscale hover:grayscale-0'
            src={props.actor.attributes.avatar_url} />
        </InternalLink>
        <div className='w-full'>
          <div className='flex justify-between mb-2 text-slate-500'>
            <InternalLink to={`/members/${props.actor.id}`}>
              <span className='font-semibold mr-2'>{props.actor.attributes.display_name}</span>
              <span className='mr-4'>@{props.actor.attributes.username}</span>
            </InternalLink>
            <ReactTimeAgo date={props.timestamp} timeStyle='twitter' />
          </div>
          { props.children }
        </div>
      </div>
    </Card>
  )
}

