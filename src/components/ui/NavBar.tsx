import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { paths } from 'routes';

type Props = {
  title?: string;
  children?: ReactNode;
};

export const NavBar: FC<Props> = ({ title, children }) => (
  <header className='mb-4 flex gap-4 items-center'>
    <Link
      role='button'
      to={paths.browsePath()}
      className='w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center'
    >
      <span className='text-sm font-bold ml-[1px] text-white'>H</span>
    </Link>
    {title ? <h1 className='text-lg'>{title}</h1> : null}
    {children}
  </header>
);
