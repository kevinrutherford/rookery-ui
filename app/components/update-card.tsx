import ReactTimeAgo from 'react-time-ago'
import { UpdateResource } from '~/api-resources/update'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'
import { Card } from './card'

const renderUpdate = (update: UpdateResource, page: TimelinePage) => {
  switch (update.type) {
    case 'update:community-created': return (
      <div>
        <h2 className='mb-4'>
          <span className='font-semibold mr-4'>@{update.attributes.actor}</span> created this community
        </h2>
        <p>
          {page.communityName()}
        </p>
      </div>
    )
    case 'update:work-not-found': return (
      <div>
        <h2 className='mb-4'>
          <span className='font-semibold mr-4'>@{update.attributes.actor}</span> could not find this paper
        </h2>
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

type Props = {
  update: UpdateResource,
  page: TimelinePage,
}

export default function UpdateCard(props: Props) {
  return (
    <Card>
      <div className='flex justify-between'>
        { renderUpdate(props.update, props.page) }
        <ReactTimeAgo date={new Date(props.update.attributes.occurred_at)} timeStyle='twitter' />
      </div>
    </Card>
  )
}

