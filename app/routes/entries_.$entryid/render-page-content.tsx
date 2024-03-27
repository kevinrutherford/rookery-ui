import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Card } from '~/components/card'
import { AddComment } from './add-comment'
import { EntryPageData, Reply } from './entry'

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

export const renderPageContent = (entry: EntryPageData): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <Card>
      {entry.frontMatter ? (
        <>
          <h2 className='font-semibold mb-4'>{entry.frontMatter.title}</h2>
          <div className='mb-4'>{entry.frontMatter.abstract}</div>
          <div className='mb-4'>{entry.frontMatter.authors.join(', ')}</div>
        </>
      ) : (
        <p className='mb-4'>doi: {entry.relationships.work.id}</p>
      )}
      <div className='text-sm text-slate-500 flex justify-between'>
        <div>
          <a className='block hover:underline'
            href={`https://doi.org/${entry.relationships.work.id}`}
            target='_blank' rel="noreferrer"
          >
            Original document
            <ArrowTopRightOnSquareIcon className='h-5 w-5 pl-1 pb-1 inline' />
          </a>
        </div>
        <div>
          Added <ReactTimeAgo date={new Date(entry.attributes.addedAt)} />
        </div>
      </div>
    </Card>
    <div className='overflow-y-auto mb-4'>
      <Replies comments={entry.comments} />
    </div>
    <AddComment entryId={entry.id} />
  </div>
)

