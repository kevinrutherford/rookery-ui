import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

export const Subheading: FC<Props> = (props: Props) => (
  <p className='font-semibold mb-4'>
    {props.children}
  </p>
)

