import { FC } from 'react'

type Props = {
  label: string,
}

export const SubmitButton: FC<Props> = (props: Props) => (
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-semibold py-2 px-4 rounded" type="submit">
        {props.label}
      </button>
    </div>
  </div>
)

