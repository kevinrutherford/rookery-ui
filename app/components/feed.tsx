import type { FC } from 'react'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateResource } from '~/api-resources/update'
import UpdateCard from '~/components/update-card'

type Props = {
  updates: ReadonlyArray<UpdateResource>,
  related: RelatedResources,
}

export const Feed: FC<Props> = (props: Props) => (
  <ul className='overflow-y-auto'>
    { props.updates.map((update, ix) => (
      <li key={ix} className='mb-4'>
        <UpdateCard update={update} related={props.related} />
      </li>
    ))}
  </ul>
)

