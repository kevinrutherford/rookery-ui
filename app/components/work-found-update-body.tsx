import { FC } from 'react'
import { RelatedResources } from '~/api-resources/related-resources'
import { UpdateWorkFound } from '~/api-resources/update'
import { WorkResource } from '~/api-resources/work'
import { InternalLink } from './internal-link'
import { lookupResource } from './lookup-resource'

type Props = {
  update: UpdateWorkFound,
  related: RelatedResources,
}

export const WorkFoundUpdateBody: FC<Props> = (props: Props) => {
  const work = lookupResource(props.related, props.update.relationships.work) as WorkResource
  return (
    <div>
      Fetched the front-matter of DOI&nbsp;
      <InternalLink to={`/works/${encodeURIComponent(work.attributes.doi)}`}>
        {work.attributes.doi}
      </InternalLink>.
    </div>
  )
}

