import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { Providers } from 'Providers';
import { routes } from 'router';

export const imageData = [
  {
    id: 1,
    author: 'Alejandro',
    url: 'https://www.example.com/1.jpg',
  },
  {
    id: 2,
    author: 'Escamilla',
    url: 'https://www.example.com/2.jpg',
  },
  {
    id: 3,
    author: 'Paul Jarvis',
    url: 'https://www.example.com/3.jpg',
  },
];

export const renderWithRouter = (initialEntries: string[] = ['/']) => {
  const router = createMemoryRouter(routes({ perPage: 2 }), { initialEntries });

  return render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
