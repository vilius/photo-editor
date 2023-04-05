import { useParams } from 'react-router-dom';

import { usePersistentState } from 'hooks/usePersistentState';
import { useGoBackWithFallback } from 'hooks/useGoBackWithFallback';

import { downloadImage } from 'lib/downloadImage';
import { imageSrc } from 'lib/picsum';

import { NavBar } from 'components/ui/NavBar';

import { Controls } from './Controls';

export type ImageConfig = {
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

  const imageSource = imageSrc(imageId || '', {
    width: imageConfig.width,
    height: imageConfig.height,
    grayscale: imageConfig.grayscale,
    blur: imageConfig.blur,
  });

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
              src={imageSource}
              alt='Preview'
              className='d-block max-h-full max-w-full object-contain'
            />
          </div>
        </div>
        <div className='bg-slate-100 rounded p-4 px-5 h-full lg:min-w-[300px]'>
          <Controls imageConfig={imageConfig} onChange={setImageConfig} />
          <button
            type='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4 w-full max-w-xs block text-center'
            onClick={() => {
              downloadImage(imageSource, {
                basename: `image-${imageId}`,
              });
            }}
          >
            Download Image
          </button>
        </div>
      </article>
    </main>
  );
};
