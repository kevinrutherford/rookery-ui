import { CollectionMember, Reply } from './collection-member';
import { FC, ReactNode } from 'react';
import { Card } from '~/components/card';

type RepliesProps = {
  comments: ReadonlyArray<Reply>,
};

const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-8'>
    { props.comments.map((comment) => (
      <li key={comment.id} className='mb-4'>
        <Card>
          {comment.content}
        </Card>
        {comment.replies.length > 0 && <Replies comments={comment.replies} />}
      </li>
    ))
    }
  </ul>
);

export const renderPageContent = (member: CollectionMember): ReactNode => (
  <div className='grow'>
    <Card>
      <p className='font-semibold mb-8'>{member.title}</p>
    </Card>
    <div className='overflow-y-auto'>
      <Replies comments={member.comments} />
    </div>
  </div>
)

