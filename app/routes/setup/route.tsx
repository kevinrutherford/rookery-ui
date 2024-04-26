import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { Card } from '~/components/card'

const SetUpCommunity: FC = () => {
  const fetcher = useFetcher()
  return (
    <Card>
      <h3 className='font-semibold mb-6'>Let&apos;s get your community set up</h3>
      <fetcher.Form method="post" action="/community">
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label className="block text-slate-500 md:text-right md:mb-0 pr-4" htmlFor="name">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              id="name"
              name="name"
              type="text"
              className="bg-slate-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label className="block text-slate-500 md:text-right mb-1 md:mb-0 pr-4" htmlFor="affiliation">
              Affiliation
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              id="affiliation"
              name="affiliation"
              type="text"
              className="bg-slate-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label className="block text-slate-500 md:text-right md:mb-0 pr-4" htmlFor="overview">
              Overview
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              id="overview"
              name="descroverview"
              className="bg-slate-100 appearance-none border-2 border-slate-100 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-semibold py-2 px-4 rounded" type="submit">
              Save
            </button>
          </div>
        </div>
      </fetcher.Form>
    </Card>
  )
}

export default SetUpCommunity

