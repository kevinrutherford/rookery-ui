import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import { FC, ReactNode } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Card } from '~/components/card'
import { AddComment } from './add-comment'
import { EntryPage } from './entry-page'
import { CommentResource } from './route'

type RepliesProps = {
  comments: ReadonlyArray<CommentResource>,
}

const Replies: FC<RepliesProps> = (props: RepliesProps) => (
  <ul className='ml-8'>
    { props.comments.map((comment) => (
      <li key={comment.id} className='mb-4'>
        <Card>
          {comment.attributes.content}
        </Card>
      </li>
    ))
    }
  </ul>
)

export const renderPageContent = (entry: EntryPage): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <Card>
      {entry.frontMatter() ? (
        <>
          <h2 className='font-semibold mb-4'>{entry.frontMatter()?.title}</h2>
          <div className='mb-4'>{entry.frontMatter()?.abstract}</div>
          <div className='mb-4'>{entry.frontMatter()?.authors.join(', ')}</div>
        </>
      ) : (
        <p className='mb-4'>doi: {entry.doi()}</p>
      )}
      <div className='text-sm text-slate-500 flex justify-between'>
        <div>
          <a className='block hover:underline'
            href={`https://doi.org/${entry.doi()}`}
            target='_blank' rel="noreferrer"
          >
            Original document <ArrowTopRightOnSquareIcon className='h-5 w-5 pl-1 pb-1 inline' />
          </a>
        </div>
        <div>
            Added to <Link to={`/collections/${entry.collectionId()}`} className='inline hover:underline'>
            {entry.collectionName()}
          </Link> <ReactTimeAgo date={entry.addedAt()} />
        </div>
      </div>
    </Card>
    <div className='overflow-y-auto mb-4'>
      <Replies comments={entry.comments()} />
    </div>
    <AddComment entryId={entry.id()} />
  </div>
)

