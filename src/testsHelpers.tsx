import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import nock from 'nock';

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

export const mockPicsum = () => {
  nock('https://picsum.photos')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/v2/list')
    .query({ page: 2, limit: 2 })
    .reply(200, [imageData[2]])
    .get('/v2/list')
    .query(true)
    .reply(200, [imageData[0], imageData[1]]);
};

export const renderWithRouter = (initialEntries: string[] = ['/']) => {
  const router = createMemoryRouter(routes({ perPage: 2 }), { initialEntries });

  return render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
