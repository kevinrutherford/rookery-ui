import { MemberResource } from '~/api-resources/member'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateResource } from '~/api-resources/update'
import ActionCard from './action-card'
import { CollectionCreatedUpdateBody } from './collection-created-update-body'
import { CommentUpdateBody } from './comment-update-body'
import { CommunityCreatedUpdateBody } from './community-created-update-body'
import { DiscussionStartedUpdateBody } from './discussion-started-update-body'
import { FrontMatterFetchedUpdateBody } from './front-matter-fetched-update-body'
import { lookupResource } from './lookup-resource'
import { WorkNotFoundUpdateBody } from './work-not-found-update-body'

const renderUpdate = (update: UpdateResource, related: RelatedResources) => {
  switch (update.type) {
    case 'update:collection-created': return (
      <CollectionCreatedUpdateBody update={update} related={related} />
    )
    case 'update:comment-created':
    case 'inbox-update:comment-created': return (
      <CommentUpdateBody update={update} related={related} />
    )
    case 'update:community-created': return (
      <CommunityCreatedUpdateBody update={update} related={related} />
    )
    case 'update:doi-entered': return (
      <DiscussionStartedUpdateBody update={update} related={related} />
    )
    case 'update:front-matter-fetched': return (
      <FrontMatterFetchedUpdateBody update={update} related={related} />
    )
    case 'update:work-not-found': return (
      <WorkNotFoundUpdateBody update={update} related={related} />
    )
    default:
      throw new Error(`Unknown update type: ${JSON.stringify(update)}`)
  }
}

type Props = {
  update: UpdateResource,
  related: RelatedResources,
}

export default function UpdateCard(props: Props) {
  let actor: MemberResource
  try {
    actor = lookupResource(props.related, props.update.relationships.actor) as MemberResource
  } catch {
    actor = {
      id: props.update.relationships.actor.data.id,
      type: props.update.relationships.actor.data.type,
      attributes: {
        username: 'unknown',
        display_name: 'Unknown User',
        avatar_url: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png',
        followingCount: 0, // SMELL -- belongs in `meta`, not here
      },
      relationships: {
        followers: {
          meta: {
            count: 0,
          },
        },
      },
    } satisfies MemberResource
  }
  return (
    <ActionCard actor={actor} timestamp={props.update.attributes.occurred_at}>
      { renderUpdate(props.update, props.related) }
    </ActionCard>
  )
}

