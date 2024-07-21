import { FC } from 'react'
import { UpdateCommentCreated } from '~/api-resources/update'

type Props = {
  update: UpdateCommentCreated,
}

export const CommentUpdateBody: FC<Props> = (props: Props) => (
  <div>
    Commented on &ldquo;{props.update.attributes.content}&rdquo;
  </div>
)

