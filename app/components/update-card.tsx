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
  return (
    <Card>
      <div className='flex flex-row gap-4'>
        <img
          className='h-10 w-10 rounded-full'
          src='https://assets.website-files.com/6278ea240c19526063fea7fb/629384b3aefd5da66f82e759_DB.PNG' />
        <div className='w-full'>
          <div className='flex justify-between mb-2 text-slate-400'>
            <div>
              <span className='text-red-400 font-semibold mr-2'>Donna Bramwell</span>
              <span className='text-red-400 mr-4'>@{props.update.attributes.actor}</span>
            </div>
            <ReactTimeAgo date={new Date(props.update.attributes.occurred_at)} timeStyle='twitter' />
          </div>
          { renderUpdate(props.update, props.page) }
        </div>
      </div>
    </Card>
  )
}

