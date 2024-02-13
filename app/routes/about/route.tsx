import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';

export default function About() {
  const navItem = contentNavItems.about;
  return (
    <>
      <ColumnTitle title={navItem.title} icon={InformationCircleIcon} />
      <div className='grow bg-white p-4'>
        <p>About...</p>
      </div>
    </>
  );
}

