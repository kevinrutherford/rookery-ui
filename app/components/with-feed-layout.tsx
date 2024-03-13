import { FC, ReactNode } from 'react'

type Props = {
  pageContent: ReactNode,
}

export const WithFeedLayout: FC<Props> = (props: Props) => (
  <>
    {props.pageContent}
  </>
)

