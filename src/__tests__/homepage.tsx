import { screen, within, act, waitFor } from '@testing-library/react';

import { renderWithRouter, mockPicsum } from 'testsHelpers';

describe('As a user, I want to be able to browse through the list of images', () => {
  beforeEach(mockPicsum);

  it('renders a list of images', async () => {
    renderWithRouter();

    const images = await screen.findAllByAltText(/Author /);

    expect(images.length).toBe(2);
  });

  it('renders a list of images with the correct author and image', async () => {
    renderWithRouter();

    const figure1 = await screen.findByLabelText(/Image by Alejandro/);
    expect(figure1).toHaveTextContent('Alejandro');
    expect(within(figure1).getByAltText(/Author/)).toHaveAttribute(
      'src',
      'https://picsum.photos/id/1/300/200'
    );

    const figure2 = await screen.findByLabelText(/Image by Escamilla/);
    expect(figure2).toHaveTextContent('Escamilla');
    expect(within(figure2).getByAltText(/Author/)).toHaveAttribute(
      'src',
      'https://picsum.photos/id/2/300/200'
    );
  });

  describe('pagination', () => {
    it('allows navigating to next page and back', async () => {
      renderWithRouter();

      const nextButton = await screen.findByRole('button', { name: /Next/ });
      await waitFor(() => {
        expect(nextButton).toHaveAttribute('aria-disabled', 'false');
      });

      const previousButton = await screen.findByRole('button', {
        name: /Previous/,
      });
      expect(previousButton).toHaveAttribute('aria-disabled', 'true');

      act(() => {
        nextButton.click();
      });
      expect(previousButton).toHaveAttribute('aria-disabled', 'false');

      const figure1 = await screen.findByLabelText(/Image by Paul Jarvis/);
      expect(within(figure1).getByAltText(/Author/)).toHaveAttribute(
        'src',
        'https://picsum.photos/id/3/300/200'
      );
      expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });
  });
});

describe('As a user, I want to click an image and be navigated to the edit image page', () => {
  beforeEach(mockPicsum);

  it('navigates to /edit/:imageId', async () => {
    renderWithRouter();

    const images = await screen.findAllByAltText(/Author /);

    act(() => {
      images[0].click();
    });

    expect(screen.getByText(/Edit Image/)).toBeInTheDocument();
  });
});
