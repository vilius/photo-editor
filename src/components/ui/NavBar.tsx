import { FC, ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
};

export const NavBar: FC<Props> = ({ title, children }) => (
  <header className='mb-4 flex gap-4 items-center'>
    {title ? <h1 className='text-lg'>{title}</h1> : null}
    {children}
  </header>
);
