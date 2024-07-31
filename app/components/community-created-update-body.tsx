import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import { FC } from 'react'
import { CommunityResource } from '~/api-resources/community'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateCommunityCreated } from '~/api-resources/update'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateCommunityCreated,
  related: RelatedResources,
}

export const CommunityCreatedUpdateBody: FC<Props> = (props: Props) => {
  const communityRef = pipe(
    props.update.relationships.community.data,
    O.getOrElseW(() => { throw new Error('') }),
    (ref) => ({ data: ref }),
  )
  const community = lookupResource(props.related, communityRef) as CommunityResource
  return (
    <div>
      Created this community and called it &ldquo;<InternalLink to='/about'>
        {community.attributes.name}
      </InternalLink>&rdquo;.
    </div>
  )
}

