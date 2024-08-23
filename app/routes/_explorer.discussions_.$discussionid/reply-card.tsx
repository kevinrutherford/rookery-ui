import { FC } from 'react'
import { CommentResource } from '~/api-resources/comment'
import { MemberResource } from '~/api-resources/member'
import ActionCard from '~/components/action-card'
import { lookupResource } from '~/components/lookup-resource'
import { DiscussionResponse } from './route'

type Props = {
  comment: CommentResource,
  resources: DiscussionResponse['included'],
}

export const ReplyCard: FC<Props> = (props: Props) => {
  const actor = lookupResource(props.resources, props.comment.relationships.author) as MemberResource
  return (
    <ActionCard actor={actor} timestamp={props.comment.attributes.createdAt}>
      {props.comment.attributes.content}
    </ActionCard>
  )
}

