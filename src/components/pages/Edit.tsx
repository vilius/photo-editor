import { useParams } from 'react-router-dom';

import { usePersistentState } from 'hooks/usePersistentState';
import { useGoBackWithFallback } from 'hooks/useGoBackWithFallback';

import { downloadImage } from 'lib/downloadImage';
import { imageSrc } from 'lib/picsum';

import { NavBar } from 'components/ui/NavBar';
import { MinMaxNumberInput } from 'components/ui/MinMaxNumberInput';

type ImageConfig = {
  width: number;
  height: number;
  grayscale: boolean;
  blur: number;
};

export const Edit = () => {
  const { imageId } = useParams<{ imageId: string }>();
  const goBackWithFallback = useGoBackWithFallback();

  const [imageConfig, setImageConfig] = usePersistentState<ImageConfig>(
    ['image-config', imageId],
    {
      width: 300,
      height: 200,
      grayscale: false,
      blur: 0,
    }
  );

  const minWidth = 1;
  const maxWidth = 5000;

  return (
    <main className='p-4 pb-8 px-8 h-screen flex flex-col'>
      <NavBar title='Edit Image'>
        <button
          type='button'
          className='border hover:border-slate-400 text-sm p-1 px-2'
          onClick={() => goBackWithFallback('/')}
        >
          Back to images
        </button>
      </NavBar>
      <article className='flex grow'>
        <div className='grow bg-slate-50 mr-4 flex items-center justify-center relative'>
          <div className='absolute max-h-full max-w-full flex'>
            <img
              src={imageSrc(imageId || '', {
                width: imageConfig.width,
                height: imageConfig.height,
                grayscale: imageConfig.grayscale,
                blur: imageConfig.blur,
              })}
              alt='Preview'
              className='d-block max-h-full max-w-full object-contain'
            />
          </div>
        </div>
        <div className='bg-slate-100 rounded p-4 px-5 h-full lg:min-w-[300px]'>
          <h2 className='mb-8'>Customize Image</h2>
          <label className='flex gap-4 mb-4'>
            <span className='grow cursor-pointer'>Width</span>
            <MinMaxNumberInput
              min={minWidth}
              max={maxWidth}
              label='Image Width'
              value={imageConfig.width}
              onChange={(value) =>
                setImageConfig((current) => ({
                  ...current,
                  width: value,
                }))
              }
            />
          </label>
          <label className='flex gap-4 mb-4'>
            <span className='grow cursor-pointer'>Height</span>
            <MinMaxNumberInput
              min={minWidth}
              max={maxWidth}
              label='Image Height'
              value={imageConfig.height}
              onChange={(value) =>
                setImageConfig((current) => ({
                  ...current,
                  height: value,
                }))
              }
            />
          </label>
          <label className='flex gap-4 mb-4'>
            <span className='grow cursor-pointer'>Grayscale</span>
            <input
              type='checkbox'
              className='w-20'
              aria-label='Make image grayscale'
              value='1'
              checked={imageConfig.grayscale}
              onChange={(e) =>
                setImageConfig((current) => ({
                  ...current,
                  grayscale: e.target.checked,
                }))
              }
            />
          </label>
          <label className='flex gap-4 mb-4'>
            <span className='grow cursor-pointer'>Blur level</span>
            <select
              className='w-20'
              aria-label='Blur image'
              onChange={(e) =>
                setImageConfig((current) => ({
                  ...current,
                  blur: parseInt(e.target.value, 10) || 0,
                }))
              }
              value={imageConfig.blur}
            >
              <option value={0}>No blur</option>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
            </select>
          </label>

          <button
            type='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4 w-full max-w-xs block text-center'
            onClick={() => {
              downloadImage(
                `https://picsum.photos/id/${imageId}/${imageConfig.width}/${
                  imageConfig.height
                }${imageConfig.grayscale ? '?grayscale' : ''}${
                  imageConfig.blur ? `?blur=${imageConfig.blur}` : ''
                }`,
                {
                  basename: `image-${imageId}`,
                }
              );
            }}
          >
            Download Image
          </button>
        </div>
      </article>
    </main>
  );
};
