import { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { CommentResource } from '~/api-resources/comment'

type RepliesProps = {
  comments: ReadonlyArray<CommentResource>,
}

export const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-4'>
    { props.comments.map((comment) => (
      <li key={comment.id}>
        <div className='bg-slate-100 mb-4 p-4 rounded-md'>
          <div className='flex justify-between gap-8'>
            {comment.attributes.content}
            <span className='text-slate-500 text-sm'>
              <ReactTimeAgo date={new Date(comment.attributes.createdAt)} timeStyle='twitter' />
            </span>
          </div>
        </div>
      </li>
    ))
    }
  </ul>
)

