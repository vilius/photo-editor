import { FC, ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
};

export const NavBar: FC<Props> = ({ title, children }) => {
  return (
    <header className='mb-4 flex gap-4 items-center'>
      <h1 className='text-lg'>{title}</h1>
      {children}
    </header>
  );
};
