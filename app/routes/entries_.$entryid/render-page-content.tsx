import { FC, ReactNode } from 'react'
import { Card } from '~/components/card'
import { AddComment } from './add-comment'
import { Entry, Reply } from './entry'

type RepliesProps = {
  comments: ReadonlyArray<Reply>,
}

const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-8'>
    { props.comments.map((comment) => (
      <li key={comment.id} className='mb-4'>
        <Card>
          {comment.content}
        </Card>
      </li>
    ))
    }
  </ul>
)

export const renderPageContent = (entry: Entry): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <Card>
      <h2 className='font-semibold mb-4'>{entry.title}</h2>
      <p className='mb-4'>doi: {entry.doi}</p>
    </Card>
    <div className='overflow-y-auto mb-4'>
      <Replies comments={entry.comments} />
    </div>
    <AddComment entryId={entry.id} />
  </div>
)

