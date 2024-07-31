import { FC } from 'react'

type Props = {
  text: string,
}

export const PaperTitle: FC<Props> = (props: Props) => (
  <span className='font-semibold italic'>{props.text}</span>
)

