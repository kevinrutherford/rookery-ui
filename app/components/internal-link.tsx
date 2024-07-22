import { Link  } from '@remix-run/react'
import { FC, ReactNode } from 'react'
import { useExplorer } from './use-explorer'

export type ExplorerContext = {
  feedSelection: string,
}

type Props = {
  to: string,
  children: ReactNode,
}

export const InternalLink: FC<Props> = (props: Props) => {
  const explorer = useExplorer()

  return (
    <Link
      to={`${props.to}${explorer.feedSelection}`}
      className='inline font-medium hover:underline'
    >
      {props.children}
    </Link>
  )

}

