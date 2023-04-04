import { render, screen, within } from '@testing-library/react';

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
    expect(images.length).toBe(2);
  });

  it('renders a list of images with the correct author and image', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(async () => {
      return {
        json: async () => imageData,
      } as Response;
    });

    render(<App />, { wrapper: Providers });

    const figure1 = screen.getByLabelText(/Image by Alejandro/);
    expect(figure1).toHaveTextContent('Alejandro');
    expect(within(figure1).getByAltText(/Author/)).toHaveAttribute(
      'src',
      'https://picsum.photos/id/1/300/200'
    );

    const figure2 = screen.getByLabelText(/Image by Escamilla/);
    expect(figure2).toHaveTextContent('Escamilla');
    expect(within(figure2).getByAltText(/Author/)).toHaveAttribute(
      'src',
      'https://picsum.photos/id/2/300/200'
    );
  });
});
