import { Link, useOutletContext  } from '@remix-run/react'
import { FC, ReactNode } from 'react'
import { ExplorerContext } from '~/routes/_explorer/route'

type Props = {
  to: string,
  children: ReactNode,
}

export const InternalLink: FC<Props> = (props: Props) => {
  const ctx = useOutletContext<ExplorerContext>()

  return (
    <Link
      to={`${props.to}${ctx.feedSelection}`}
      className='inline font-semibold hover:underline'
    >
      {props.children}
    </Link>
  )

}

