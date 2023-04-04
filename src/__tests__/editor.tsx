import { screen, act } from '@testing-library/react';
import nock from 'nock';

import { renderWithRouter } from 'testsHelpers';

const imageData = [
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

describe('As a user, I want to click an image and be navigated to the edit image page', () => {
  beforeEach(() => {
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
  });

  it('navigates to /edit/:imageId when image clicked', async () => {
    renderWithRouter();

    const images = await screen.findAllByAltText(/Author /);

    act(() => {
      images[0].click();
    });

    expect(screen.getByText(/Edit Image/)).toBeInTheDocument();
  });
});
