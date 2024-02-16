import type { FC, ReactNode } from 'react';

type ColumnProps = {
  children: ReactNode;
};

export const Column: FC<ColumnProps> = (props: ColumnProps) => (
  <div className='flex flex-col overflow-hidden'>{props.children}</div>
);

