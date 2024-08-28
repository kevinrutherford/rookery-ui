import { FC, ReactNode } from 'react'
import { DiscussionResource } from '~/api-resources/discussion'
import { InternalLink } from './internal-link'

type Props = {
  discussion: DiscussionResource,
  children: ReactNode,
}

export const DiscussionLink: FC<Props> = (props: Props) => {
  const id = props.discussion.id.replace('/api', '')
  return id.includes('/') ? (
    <a href={id} className='inline font-medium hover:underline' target='_blank' rel='noreferrer'>{props.children}</a>
  ) : (
    <InternalLink to={`/discussions/${id}`}>
      {props.children}
    </InternalLink>
  )
}

