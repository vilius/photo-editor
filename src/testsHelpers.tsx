import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import nock from 'nock';

import { Providers } from 'Providers';
import { routes } from 'router';

export const imageData = [
  {
    id: 1,
    author: 'Alejandro',
    width: 2000,
    height: 1500,
    url: 'https://www.example.com/1.jpg',
    download_url: 'https://www.example.com/1.download.jpg',
  },
  {
    id: 2,
    author: 'Escamilla',
    width: 200,
    height: 150,
    url: 'https://www.example.com/2.jpg',
    download_url: 'https://www.example.com/2.download.jpg',
  },
  {
    id: 3,
    author: 'Paul Jarvis',
    width: 500,
    height: 500,
    url: 'https://www.example.com/3.jpg',
    download_url: 'https://www.example.com/3.download.jpg',
  },
];

export const mockPicsum = () => {
  nock('https://picsum.photos')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/v2/list')
    .query(true)
    .reply(200, (url) => {
      const queryString = url.split('?')[1];
      const params = new URLSearchParams(queryString);
      const page = parseInt(params.get('page') ?? '1', 10);
      const limit = parseInt(params.get('limit') ?? '2', 10);

      return imageData.slice((page - 1) * limit, page * limit);
    });
};

export const renderWithRouter = (initialEntries: string[] = ['/']) => {
  const router = createMemoryRouter(routes({ perPage: 2 }), { initialEntries });

  return render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
