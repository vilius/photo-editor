import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title?: string;
  children?: ReactNode;
  disabled?: boolean;
  to: string;
};

export const LinkButton: FC<Props> = ({ disabled, to, children }) => (
  <Link
    role='button'
    className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4'
    style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
    to={to}
    aria-disabled={Boolean(disabled)}
  >
    {children}
  </Link>
);
