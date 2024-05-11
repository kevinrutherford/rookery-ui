import { ActionFunctionArgs } from '@remix-run/node'
import {
  NavLink,
  Outlet,
  useLocation,
} from '@remix-run/react'
import { Column } from '~/components/column'
import { contentNavItems } from '~/components/content-nav-items'
import { authenticator } from '~/services/auth.server'
import { AuthBar } from '../authbar/route'
import { LocalTimeline } from '../localtimeline/route'

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/' })
};

const ExplorerLayout = () => {
  const location = useLocation()

  return (
    <>
      <AuthBar />
      <div className='grid grid-cols-2 gap-12 h-full overflow-hidden'>
        <Column>
          <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
            <li className='inline mr-6 mt-6 mb-6'>
              <NavLink
                className='border-b-4 border-slate-400'
                to={location.pathname}
              >
                Local timeline
              </NavLink>
            </li>
          </ul>
          <LocalTimeline />
        </Column>
        <Column>
          <ul className='p-4 bg-slate-100 mb-4 rounded-md'>
            {Object.values(contentNavItems).map((item) => (
              <li key={item.route} className='inline mr-6 mt-6 mb-6'>
                <NavLink
                  className={({ isActive }) => isActive
                    ? 'border-b-4 border-slate-400'
                    : ''}
                  to={`${item.route}`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <Outlet />
        </Column>
      </div>
    </>
  )
}

export default ExplorerLayout

