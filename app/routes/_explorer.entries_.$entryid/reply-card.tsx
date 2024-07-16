import { FC } from 'react'
import { AccountResource } from '~/api-resources/account'
import { CommentResource } from '~/api-resources/comment'
import ActionCard from '~/components/action-card'
import { lookupResource } from '~/components/lookup-resource'
import { EntryResponse } from './route'

type Props = {
  comment: CommentResource,
  resources: EntryResponse['included'],
}

export const ReplyCard: FC<Props> = (props: Props) => {
  const actor = lookupResource(props.resources, props.comment.relationships.author) as AccountResource
  return (
    <ActionCard actor={actor} timestamp={new Date(props.comment.attributes.createdAt)}>
      {props.comment.attributes.content}
    </ActionCard>
  )
}

