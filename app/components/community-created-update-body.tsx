import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import { FC } from 'react'
import { CommunityResource } from '~/api-resources/community'
import { EntryResource } from '~/api-resources/entry'
import { MemberResource } from '~/api-resources/member'
import { UpdateCommunityCreated } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateCommunityCreated,
  related: ReadonlyArray<MemberResource | CommunityResource | EntryResource | WorkResource>,
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
      Created this community and called it &ldquo;{community.attributes.name}&rdquo;.
    </div>
  )
}

