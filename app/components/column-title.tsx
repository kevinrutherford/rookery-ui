import type { FC } from 'react';

type ColumnTitleProps = {
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

export const ColumnTitle: FC<ColumnTitleProps> = (props: ColumnTitleProps) => (
  <div className='shrink-0 border-b border-teal-500 text-teal-700 p-3 font-semibold bg-teal-200'>
    <props.icon className='h-6 w-6 inline mr-3' />
    {props.title}
  </div>
);

