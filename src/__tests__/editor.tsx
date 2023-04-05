import { screen, fireEvent, act } from '@testing-library/react';

import { renderWithRouter, mockPicsum } from 'testsHelpers';

describe('As a user, I want to be able to edit image', () => {
  beforeEach(mockPicsum);
  beforeEach(() => {
    window.localStorage.clear();
  });

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

  it('allows choosing grayscale mode', async () => {
    renderWithRouter(['/edit/1']);

    const grayscaleInput = screen.getByLabelText('Make image grayscale');

    expect(grayscaleInput).toBeInTheDocument();

    act(() => {
      grayscaleInput.click();
    });

    const preview = screen.getByAltText('Preview');
    if (!(preview instanceof HTMLImageElement)) {
      throw new Error('Preview is not an image');
    }

    expect(preview.src).toBe('https://picsum.photos/id/1/300/200?grayscale');
  });

  it('allows choosing blur level', async () => {
    renderWithRouter(['/edit/1']);

    const blurLevelSelect = screen.getByLabelText('Blur image');

    expect(blurLevelSelect).toBeInTheDocument();

    fireEvent.change(blurLevelSelect, { target: { value: '5' } });

    const preview = screen.getByAltText('Preview');
    if (!(preview instanceof HTMLImageElement)) {
      throw new Error('Preview is not an image');
    }

    expect(preview.src).toBe('https://picsum.photos/id/1/300/200?blur=5');
  });
});
