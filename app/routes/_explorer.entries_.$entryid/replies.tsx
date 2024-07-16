import { FC } from 'react'
import { CommentResource } from '~/api-resources/comment'
import { ReplyCard } from './reply-card'

type RepliesProps = {
  comments: ReadonlyArray<CommentResource>,
}

export const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-4'>
    { props.comments.map((comment) => (
      <li key={comment.id}>
        <ReplyCard comment={comment} />
      </li>
    ))
    }
  </ul>
)

