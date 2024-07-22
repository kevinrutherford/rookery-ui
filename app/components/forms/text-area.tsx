import { FC } from 'react'
import { useExplorer } from '../use-explorer'

type Props = {
  label: string,
  attr: string,
}

export const TextArea: FC<Props> = (props: Props) => {
  const explorer = useExplorer()
  return (
    <div className='md:flex md:items-center mb-4'>
      <div className='md:w-1/3'>
        <label className='block text-slate-500 md:text-right md:mb-0 pr-4' htmlFor={props.attr}>
          {props.label}
        </label>
      </div>
      <div className='md:w-2/3'>
        <textarea
          id={props.attr}
          name={props.attr}
          className={`bg-${explorer.theme}-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
        />
      </div>
    </div>
  )
}

