import ReactTimeAgo from 'react-time-ago'
import { UpdateResource } from '~/api-resources/update'
import { Card } from './card'

const renderUpdate = (update: UpdateResource) => {
  switch (update.type) {
    case 'update:community-created': return (
      <div>
        <h2 className='mb-4'>
          <span className='font-semibold mr-4'>@{update.attributes.actor}</span> created this community
        </h2>
        <p>
          {'Data from update.included[0].attributes.name'}
        </p>
      </div>
    )
    default: return (
      <div>
        <h2 className='mb-4'>
          <span className='font-semibold mr-4'>@{update.attributes.actor}</span> {update.attributes.action}
        </h2>
        <p>
          {update.attributes.content}
        </p>
      </div>
    )
  }
}

type Props = UpdateResource

export default function UpdateCard(update: Props) {
  return (
    <Card>
      <div className='flex justify-between'>
        { renderUpdate(update) }
        <ReactTimeAgo date={new Date(update.attributes.occurred_at)} timeStyle='twitter' />
      </div>
    </Card>
  )
}

