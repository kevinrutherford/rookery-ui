import { Link, useOutletContext  } from '@remix-run/react'
import { FC, ReactNode } from 'react'
import { ExplorerContext } from '~/routes/_explorer/route'

type Props = {
  to: string,
  children: ReactNode,
}

export const Navigate: FC<Props> = (props: Props) => {
  const ctx = useOutletContext<ExplorerContext>()

  return (
    <Link
      to={`${props.to}${ctx.feedSelection}`}
      className='inline hover:underline'
    >
      {props.children}
    </Link>
  )

}

