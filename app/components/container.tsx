import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

export const Container: FC<Props> = (props: Props) => (
  <div className='container mx-auto h-full overflow-hidden'>
    {props.children}
  </div>
)

