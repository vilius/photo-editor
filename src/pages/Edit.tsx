import { useParams } from 'react-router-dom';

import { usePersistentState } from 'hooks/usePersistentState';

import { NavBar } from 'components/ui/NavBar';

type ImageConfig = {
  width: number;
  height: number;
};

export const Edit = () => {
  const { imageId } = useParams<{ imageId: string }>();

  const [imageConfig, setImageConfig] = usePersistentState<ImageConfig>(
    ['image-config', imageId],
    {
      width: 300,
      height: 200,
    }
  );

  return (
    <main className='p-4 pb-8 px-8 h-screen flex flex-col'>
      <NavBar title='Edit Image' />
      <article className='flex grow'>
        <div className='grow'>
          <img
            src={`https://picsum.photos/id/${imageId}/${imageConfig.width}/${imageConfig.height}`}
            alt='Preview'
            width={imageConfig.width}
            height={imageConfig.height}
            className='d-block'
          />
        </div>
        <div className='bg-slate-200 rounded p-4 px-5 h-full'>
          <h2 className='mb-8'>Customize Image</h2>
          <label className='flex gap-4 mb-4'>
            <span className='grow cursor-pointer'>Width</span>
            <input
              type='number'
              className='w-20'
              aria-label='Image Width'
              value={imageConfig.width}
              onChange={(e) =>
                setImageConfig((current) => ({
                  ...current,
                  width: parseInt(e.target.value, 10) || 200,
                }))
              }
            />
          </label>
          <label className='flex gap-4'>
            <span className='grow cursor-pointer'>Height</span>
            <input
              type='number'
              className='w-20'
              aria-label='Image Height'
              value={imageConfig.height}
              onChange={(e) =>
                setImageConfig((current) => ({
                  ...current,
                  height: parseInt(e.target.value, 10) || 300,
                }))
              }
            />
          </label>
        </div>
      </article>
    </main>
  );
};
