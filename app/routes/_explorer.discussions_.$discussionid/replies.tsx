import { FC } from 'react'
import { CommentResource } from '~/api-resources/comment'
import { ReplyCard } from './reply-card'
import { DiscussionResponse } from './route'

type Props = {
  comments: ReadonlyArray<CommentResource>,
  resources: DiscussionResponse['included'],
}

export const Replies: FC<Props> = (props: Props) => (
  <ul className='ml-4'>
    { props.comments.map((comment) => (
      <li key={comment.id}>
        <ReplyCard comment={comment} resources={props.resources} />
      </li>
    ))
    }
  </ul>
)

