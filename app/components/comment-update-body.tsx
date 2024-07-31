import { FC } from 'react'
import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { MemberResource } from '~/api-resources/member'
import { UpdateCommentCreated } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'
import { PaperTitle } from './paper-title'

type Props = {
  update: UpdateCommentCreated,
  related: ReadonlyArray<MemberResource | CommunityResource | EntryResource | WorkResource>,
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
      Commented on <InternalLink to={`/entries/${entry.id}`}>
        <PaperTitle text={title} />
      </InternalLink>
    </div>
  )
}

