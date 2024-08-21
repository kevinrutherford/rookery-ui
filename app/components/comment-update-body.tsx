import { FC } from 'react'
import { DiscussionResource } from '~/api-resources/discussion'
import { RelatedResources } from '~/api-resources/related-resources'
import { InboxUpdateCommentCreated, UpdateCommentCreated } from '~/api-resources/update'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'
import { PaperTitle } from './paper-title'

type Props = {
  update: UpdateCommentCreated | InboxUpdateCommentCreated,
  related: RelatedResources,
}

export const CommentUpdateBody: FC<Props> = (props: Props) => {
  const discussion = lookupResource(props.related, props.update.relationships.entry) as DiscussionResource
  return (
    <div>
      Commented on <InternalLink to={`/discussions/${discussion.id}`}>
        <PaperTitle text={discussion.attributes.title} />
      </InternalLink>
    </div>
  )
}

