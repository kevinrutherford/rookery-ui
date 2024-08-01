import { FC } from 'react'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateWorkNotFound } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateWorkNotFound,
  related: RelatedResources,
}

export const WorkNotFoundUpdateBody: FC<Props> = (props: Props) => {
  const work = lookupResource(props.related, props.update.relationships.work) as WorkResource
  return (
    <div>
      There is no paper with DOI&nbsp;
      <InternalLink to={`/works/${encodeURIComponent(work.attributes.doi)}`}>
        {work.attributes.doi}
      </InternalLink>.
    </div>
  )
}

