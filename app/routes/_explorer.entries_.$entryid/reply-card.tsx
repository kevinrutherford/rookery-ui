import { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { CommentResource } from '~/api-resources/comment'

type Props = {
  comment: CommentResource,
}

export const ReplyCard: FC<Props> = (props: Props) => (
  <div className='bg-slate-100 mb-4 p-4 rounded-md'>
    <div className='flex justify-between gap-8 mb-4'>
      <span className='text-red-500 mr-4'>@you</span>
      <span className='text-slate-500 text-sm'>
        <ReactTimeAgo date={new Date(props.comment.attributes.createdAt)} timeStyle='twitter' />
      </span>
    </div>
    <p>
      {props.comment.attributes.content}
    </p>
  </div>
)

