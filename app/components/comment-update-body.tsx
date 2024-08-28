import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { FC } from 'react'
import { DiscussionResource } from '~/api-resources/discussion'
import { RelatedResources } from '~/api-resources/related-resources'
import { InboxUpdateCommentCreated, UpdateCommentCreated } from '~/api-resources/update'
import { DiscussionLink } from './discussion-link'
import { PaperTitle } from './paper-title'

type Props = {
  update: UpdateCommentCreated | InboxUpdateCommentCreated,
  related: RelatedResources,
}

export const CommentUpdateBody: FC<Props> = (props: Props) => {
  const discussionLink = props.update.relationships.discussion.data
  if (discussionLink == null) {
    return (
      <div>
        Commented on <PaperTitle text='Unknown paper' />
      </div>
    )
  }
  const discussion = pipe( // SMELL -- duplicated with lookupResource
    props.related,
    RA.filter((inc) => inc.type === discussionLink.type && inc.id === discussionLink.id),
    RA.head,
    O.getOrElseW(() => { throw new Error(`Resources expected to include ${JSON.stringify(discussionLink)}`) }),
  ) as DiscussionResource
  return (
    <div>
      Commented on <DiscussionLink discussion={discussion} />
    </div>
  )
}

