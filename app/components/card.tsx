import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

export const Card: FC<Props> = (props: Props) => (
  <div className='bg-white mb-4 p-4 rounded-md overflow-hidden'>
    {props.children}
  </div>
)

