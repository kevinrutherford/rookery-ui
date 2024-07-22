import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'
import { useExplorer } from '~/components/use-explorer'

type Props = {
  entryId: string,
}

export const AddComment: FC<Props> = (props: Props) => {
  const explorer = useExplorer()
  const fetcher = useFetcher()
  return (
    <Card>
      <fetcher.Form method='post' className='w-full'>
        <input type='hidden'
          id='entryId'
          name='entryId'
          value={props.entryId}
        />
        <div className='md:flex md:items-center mb-2'>
          <div className='md:w-1/3'>
            <label className='block text-slate-500 md:text-right md:mb-0 pr-4' htmlFor='doi'>
              Your comment:
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              id='content'
              name='content'
              type='text'
              className={`bg-${explorer.theme}-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
            />
          </div>
        </div>
      </fetcher.Form>
    </Card>
  )
}

