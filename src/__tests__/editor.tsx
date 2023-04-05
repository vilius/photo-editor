import { screen, fireEvent } from '@testing-library/react';

import { renderWithRouter, mockPicsum } from 'testsHelpers';

describe('As a user, I want to be able to edit image', () => {
  beforeEach(mockPicsum);

  it('allows changing image width and height', async () => {
    renderWithRouter(['/edit/1']);

    const widthInput = screen.getByLabelText('Image Width');
    const heightInput = screen.getByLabelText('Image Height');

    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();

    fireEvent.change(widthInput, { target: { value: '300' } });
    fireEvent.change(heightInput, { target: { value: '100' } });

    const preview = screen.getByAltText('Preview');
    if (!(preview instanceof HTMLImageElement)) {
      throw new Error('Preview is not an image');
    }

    expect(preview.src).toBe('https://picsum.photos/id/1/300/100');
  });
});
