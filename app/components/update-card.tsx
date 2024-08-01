import { MemberResource } from '~/api-resources/member'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateResource } from '~/api-resources/update'
import ActionCard from './action-card'
import { CollectionCreatedUpdateBody } from './collection-created-update-body'
import { CommentUpdateBody } from './comment-update-body'
import { CommunityCreatedUpdateBody } from './community-created-update-body'
import { DoiEnteredUpdateBody } from './doi-entered-update-body'
import { lookupResource } from './lookup-resource'
import { WorkFoundUpdateBody } from './work-found-update-body'
import { WorkNotFoundUpdateBody } from './work-not-found-update-body'

const renderUpdate = (update: UpdateResource, related: RelatedResources) => {
  switch (update.type) {
    case 'update:collection-created': return (
      <CollectionCreatedUpdateBody update={update} related={related} />
    )
    case 'update:comment-created': return (
      <CommentUpdateBody update={update} related={related} />
    )
    case 'update:community-created': return (
      <CommunityCreatedUpdateBody update={update} related={related} />
    )
    case 'update:doi-entered': return (
      <DoiEnteredUpdateBody update={update} related={related} />
    )
    case 'update:work-found': return (
      <WorkFoundUpdateBody update={update} related={related} />
    )
    case 'update:work-not-found': return (
      <WorkNotFoundUpdateBody update={update} related={related} />
    )
    default: return (
      <div className='flex-grow text-red-500'>
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

