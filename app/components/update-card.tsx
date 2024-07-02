import ReactTimeAgo from 'react-time-ago'
import { UpdateResource } from '~/api-resources/update'
import { Card } from './card'

type Props = UpdateResource

export default function UpdateCard(props: Props) {
  return (
    <Card>
      <div className='flex justify-between mb-4'>
        <div className='flex gap-x-4'>
          <h2>
            <span className='font-semibold'>@{props.attributes.actor}</span> {props.attributes.action}
          </h2>
        </div>
        <ReactTimeAgo date={new Date(props.attributes.timestamp)} timeStyle='twitter' />
      </div>
      <p>
        {props.attributes.content}
      </p>
    </Card>
  )
}

