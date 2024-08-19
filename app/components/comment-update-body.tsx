import { FC } from 'react'
import { EntryResource } from '~/api-resources/entry'
import { RelatedResources } from '~/api-resources/related-resources'
import { InboxUpdateCommentCreated, UpdateCommentCreated } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'
import { PaperTitle } from './paper-title'

type Props = {
  update: UpdateCommentCreated | InboxUpdateCommentCreated,
  related: RelatedResources,
}

export const CommentUpdateBody: FC<Props> = (props: Props) => {
  const entry = lookupResource(props.related, props.update.relationships.entry) as EntryResource
  const work = lookupResource(props.related, props.update.relationships.work) as WorkResource
  let title: string
  switch (work.attributes.crossrefStatus) {
    case 'found':
      title = work.attributes.title
      break
    default:
      title = work.attributes.doi
      break
  }
  return (
    <div>
      Commented on <InternalLink to={`/discussions/${entry.id}`}>
        <PaperTitle text={title} />
      </InternalLink>
    </div>
  )
}

