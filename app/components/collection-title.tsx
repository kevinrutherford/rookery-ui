import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

type Props = {
  name: string,
  isPrivate: boolean,
}

export const CollectionTitle: FC<Props> = (props: Props) => (
  <div className='flex justify-between mb-4'>
    <h2 className='font-semibold'>{props.name}</h2>
    { props.isPrivate && <EyeSlashIcon className='h-5 w-5 pl-1 inline' /> }
  </div>
)

