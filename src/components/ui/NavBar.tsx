import { FC } from 'react';

type Props = {
  title?: string;
};

export const NavBar: FC<Props> = ({ title }) => {
  return (
    <header className='mb-4'>
      <h1 className='text-lg'>{title}</h1>
    </header>
  );
};
