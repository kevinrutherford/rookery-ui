import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AccountResource } from '~/api-resources/account'
import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { UpdateCommentCreated } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateCommentCreated,
  related: ReadonlyArray<AccountResource | CommunityResource | EntryResource | WorkResource>,
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
      Commented on <Link className='font-semibold hover:underline' to={`/entries/${entry.id}`}>{title}</Link>
    </div>
  )
}

