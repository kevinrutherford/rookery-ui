import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

export const Metadata: FC<Props> = (props: Props) => (
  <div className='text-sm text-slate-500 flex justify-between'>
    {props.children}
  </div>
)

