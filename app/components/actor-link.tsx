import { FC, ReactNode } from 'react'
import { MemberResource } from '~/api-resources/member'
import { InternalLink } from './internal-link'

type Props = {
  actor: MemberResource,
  children: ReactNode,
}

export const ActorLink: FC<Props> = (props: Props) => {
  const id = props.actor.id
  return id.includes('/') ? (
    <a href={id} target='_blank' rel='noreferrer'>{props.children}</a>
  ) : (
    <InternalLink to={`/members/${id}`}>
      {props.children}
    </InternalLink>
  )
}

