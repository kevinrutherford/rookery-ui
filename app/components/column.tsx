import type { FC, ReactNode } from 'react';

type ColumnProps = {
  children: ReactNode;
};

export const Column: FC<ColumnProps> = (props: ColumnProps) => (
  <div className='flex flex-column border-solid border border-teal-500 rounded-xl overflow-hidden'>{props.children}</div>
);

