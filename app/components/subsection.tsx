import { FC, ReactNode } from 'react'
import { Subheading } from '~/components/subheading'

type Props = {
  title: string,
  children: ReactNode,
}

export const Subsection: FC<Props> = (props: Props) => (
  <div className='mr-8 ml-8'>
    <Subheading>
      {props.title}
    </Subheading>
    {props.children}
  </div>
)

