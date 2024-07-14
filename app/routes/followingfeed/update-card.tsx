import { Link } from '@remix-run/react'
import ReactTimeAgo from 'react-time-ago'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { Card } from '~/components/card'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'

const renderUpdate = (update: UpdateResource, page: TimelinePage) => {
  switch (update.type) {
    case 'update:community-created': return (
      <div>
        <h2 className='mb-4'>
          <span className='text-red-500 font-semibold mr-4'>@{update.attributes.actor}</span> created this community
        </h2>
        <p>
          {page.communityName()}
        </p>
      </div>
    )
    case 'update:work-not-found': return (
      <div>
        <h2 className='mb-4'>
          <span className='text-red-500 font-semibold mr-4'>@{update.attributes.actor}</span> could not find this paper
        </h2>
        <Link to={`/works/${encodeURIComponent((page.included(update.relationships.work.data) as WorkResource).attributes.doi)}`} className='block hover:underline'>
          DOI: {(page.included(update.relationships.work.data) as WorkResource).attributes.doi}
        </Link>
      </div>
    )
    default: return (
      <div>
        <h2 className='mb-4'>
          <span className='text-red-500 font-semibold mr-4'>@{update.attributes.actor}</span> {update.attributes.action}
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

