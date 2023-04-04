import { render, screen } from '@testing-library/react';

import { App } from 'App';
import { Providers } from 'Providers';

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
];

describe('As a user, I want to be able to browse through the list of images.', () => {
  it('renders a list of images', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(async () => {
      return {
        json: async () => imageData,
      } as Response;
    });

    render(<App />, { wrapper: Providers });
    const images = await screen.findAllByAltText(/Author /);
    expect(images.length).toBe(imageData.length);
  });
});
