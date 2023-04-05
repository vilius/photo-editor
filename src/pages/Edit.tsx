import { useParams } from 'react-router-dom';

import { usePersistentState } from 'hooks/usePersistentState';

import { NavBar } from 'components/ui/NavBar';

type ImageConfig = {
  width: number;
  height: number;
  grayscale: boolean;
  blur: number;
};

export const Edit = () => {
  const { imageId } = useParams<{ imageId: string }>();

  const [imageConfig, setImageConfig] = usePersistentState<ImageConfig>(
    ['image-config', imageId],
    {
      width: 300,
      height: 200,
      grayscale: false,
      blur: 0,
    }
  );

  return (
    <main className='p-4 pb-8 px-8 h-screen flex flex-col'>
      <NavBar title='Edit Image' />
      <article className='flex grow'>
        <div className='grow'>
          <img
            src={`https://picsum.photos/id/${imageId}/${imageConfig.width}/${
              imageConfig.height
            }${imageConfig.grayscale ? '?grayscale' : ''}${
              imageConfig.blur ? `?blur=${imageConfig.blur}` : ''
            }`}
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
          <label className='flex gap-4 mb-4'>
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
          <label className='flex gap-4'>
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
        </div>
      </article>
    </main>
  );
};
