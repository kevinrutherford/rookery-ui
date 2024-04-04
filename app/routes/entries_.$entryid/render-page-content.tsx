import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import { ReactNode } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { AddComment } from './add-comment'
import { EntryPage } from './entry-page'
import { Replies } from './replies'

export const renderPageContent = (entry: EntryPage): ReactNode => (
  <div className='flex flex-col overflow-hidden'>
    <div className='flex flex-col bg-white mb-4 p-4 rounded-md overflow-hidden'>
      <p className='mb-4'>doi: {entry.doi()}</p>
      <div className='text-sm text-slate-500 flex justify-between mb-20'>
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
      <div className='overflow-y-auto'>
        <Replies comments={entry.comments()} />
      </div>
    </div>
    <AddComment entryId={entry.id()} />
  </div>
)

