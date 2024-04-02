import { FC } from 'react'
import { CommentResource } from '~/api-resources/comment'
import { Card } from '~/components/card'

type RepliesProps = {
  comments: ReadonlyArray<CommentResource>,
}

export const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-8'>
    { props.comments.map((comment) => (
      <li key={comment.id} className='mb-4'>
        <Card>
          <div className='flex justify-between'>
            {comment.attributes.content}
            <span className='text-slate-500 text-sm'>4h</span>
          </div>
        </Card>
      </li>
    ))
    }
  </ul>
)

