import { Link } from '@remix-run/react'
import { AccountResource } from '~/api-resources/account'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { TimelinePage } from '~/routes/localtimeline/timeline-page'
import ActionCard from './action-card'
import { lookupResource } from './lookup-resource'

const renderUpdate = (update: UpdateResource, page: TimelinePage) => {
  switch (update.type) {
    case 'update:comment-created': return (
      <div>
        Commented: &ldquo;{update.attributes.content}&rdquo;
      </div>
    )
    case 'update:community-created': return (
      <div>
        Created this community &ldquo;{page.communityName()}&rdquo;.
      </div>
    )
    case 'update:work-not-found': return (
      <div>
        Could not find a paper with DOI <Link to={`/works/${encodeURIComponent((lookupResource(page.includes, update.relationships.work) as WorkResource).attributes.doi)}`} className='inline hover:underline'>
          {(lookupResource(page.includes, update.relationships.work) as WorkResource).attributes.doi}
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
  const actor = lookupResource(props.page.includes, props.update.relationships.actor) as AccountResource
  return (
    <ActionCard actor={actor} timestamp={props.update.attributes.occurred_at}>
      { renderUpdate(props.update, props.page) }
    </ActionCard>
  )
}

