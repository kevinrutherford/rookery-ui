import { Link } from '@remix-run/react'
import ReactTimeAgo from 'react-time-ago'
import { AccountResource } from '~/api-resources/account'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { Card } from '~/components/card'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'

const renderUpdate = (update: UpdateResource, page: TimelinePage) => {
  switch (update.type) {
    case 'update:community-created': return (
      <div>
        Created this community &ldquo;{page.communityName()}&rdquo;.
      </div>
    )
    case 'update:work-not-found': return (
      <div>
        Could not find a paper with DOI <Link to={`/works/${encodeURIComponent((page.included(update.relationships.work.data) as WorkResource).attributes.doi)}`} className='inline hover:underline'>
          {(page.included(update.relationships.work.data) as WorkResource).attributes.doi}
        </Link>.
      </div>
    )
    default: return (
      <div className='flex-grow'>
        <p>
          {update.attributes.action}
        </p>
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
  const actor = props.page.included(props.update.relationships.actor.data) as AccountResource
  return (
    <Card>
      <div className='flex flex-row gap-4'>
        <img
          className='h-10 w-10 rounded-full'
          src={actor.attributes.avatar_url} />
        <div className='w-full'>
          <div className='flex justify-between mb-2 text-slate-500'>
            <div>
              <span className='font-semibold mr-2'>{actor.attributes.display_name}</span>
              <span className='mr-4'>@{actor.attributes.username}</span>
            </div>
            <ReactTimeAgo date={new Date(props.update.attributes.occurred_at)} timeStyle='twitter' />
          </div>
          { renderUpdate(props.update, props.page) }
        </div>
      </div>
    </Card>
  )
}

