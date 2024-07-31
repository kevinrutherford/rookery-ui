import { MemberResource } from '~/api-resources/member'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateResource } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import ActionCard from './action-card'
import { CommentUpdateBody } from './comment-update-body'
import { CommunityCreatedUpdateBody } from './community-created-update-body'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

const renderUpdate = (update: UpdateResource, related: RelatedResources) => {
  switch (update.type) {
    case 'update:comment-created': return (
      <CommentUpdateBody update={update} related={related} />
    )
    case 'update:community-created': return (
      <CommunityCreatedUpdateBody update={update} related={related} />
    )
    case 'update:work-not-found': return (
      <div>
        Could not find a paper with DOI&nbsp;
        <InternalLink to={`/works/${encodeURIComponent((lookupResource(related, update.relationships.work) as WorkResource).attributes.doi)}`}>
          {(lookupResource(related, update.relationships.work) as WorkResource).attributes.doi}
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
  related: RelatedResources,
}

export default function UpdateCard(props: Props) {
  const actor = lookupResource(props.related, props.update.relationships.actor) as MemberResource
  return (
    <ActionCard actor={actor} timestamp={props.update.attributes.occurred_at}>
      { renderUpdate(props.update, props.related) }
    </ActionCard>
  )
}

