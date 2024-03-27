import ReactTimeAgo from 'react-time-ago'
import { Card } from './card'
import { FeedEvent } from './feed-event'

type FEProps = FeedEvent

export default function FeedEventCard(props: FEProps) {
  return (
    <Card>
      <div className='flex justify-between mb-4'>
        <div className='flex gap-x-4'>
          <h2>
            <span className='font-semibold'>@{props.userHandle}</span> {props.action}
          </h2>
        </div>
        <ReactTimeAgo date={new Date(props.timestamp)} />
      </div>
      <p>
        {props.content}
      </p>
    </Card>
  )
}

