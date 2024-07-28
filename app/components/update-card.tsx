import { MemberResource } from '~/api-resources/member'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import ActionCard from './action-card'
import { CommentUpdateBody } from './comment-update-body'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'
import { TimelinePage } from './timeline-page'

const renderUpdate = (update: UpdateResource, page: TimelinePage) => {
  switch (update.type) {
    case 'update:comment-created': return (
      <CommentUpdateBody update={update} related={page.includes} />
    )
    case 'update:community-created': return (
      <div>
        Created this community &ldquo;{page.communityName()}&rdquo;.
      </div>
    )
    case 'update:work-not-found': return (
      <div>
        Could not find a paper with DOI&nbsp;
        <InternalLink to={`/works/${encodeURIComponent((lookupResource(page.includes, update.relationships.work) as WorkResource).attributes.doi)}`}>
          {(lookupResource(page.includes, update.relationships.work) as WorkResource).attributes.doi}
        </InternalLink>.
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
  const actor = lookupResource(props.page.includes, props.update.relationships.actor) as MemberResource
  return (
    <ActionCard actor={actor} timestamp={props.update.attributes.occurred_at}>
      { renderUpdate(props.update, props.page) }
    </ActionCard>
  )
}

