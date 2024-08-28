import { FC } from 'react'
import { DiscussionResource } from '~/api-resources/discussion'
import { InternalLink } from './internal-link'
import { PaperTitle } from './paper-title'

type Props = {
  discussion: DiscussionResource,
}

export const DiscussionLink: FC<Props> = (props: Props) => {
  const id = props.discussion.id.replace('/api', '')
  const content = <PaperTitle text={props.discussion.attributes.title} />
  return id.includes('/') ? (
    <a href={id} className='inline font-medium hover:underline' target='_blank' rel='noreferrer'>{content}</a>
  ) : (
    <InternalLink to={`/discussions/${id}`}>{content}</InternalLink>
  )
}

