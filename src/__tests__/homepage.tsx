import { render, screen } from '@testing-library/react';
import { App } from '../App';

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
    render(<App />);
    const images = await screen.findAllByLabelText(/Image by/);
    expect(images.length).toBe(imageData.length);
  });
});
