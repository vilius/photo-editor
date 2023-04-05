import { FC } from 'react';

import { Picsum } from 'lib/picsum';

import { MinMaxNumberInput } from 'components/ui/MinMaxNumberInput';

import type { ImageConfig } from './Edit';

type Props = {
  imageConfig: ImageConfig;
  onChange: (config: ImageConfig) => void;
};

export const Controls: FC<Props> = ({ imageConfig, onChange }) => {
  return (
    <>
      <h2 className='mb-8'>Customize Image</h2>
      <label className='flex gap-4 mb-4'>
        <span className='grow cursor-pointer'>Width</span>
        <MinMaxNumberInput
          className='p-1 px-2 w-28'
          min={Picsum.MIN_WIDTH}
          max={Picsum.MAX_WIDTH}
          label='Image Width'
          value={imageConfig.width}
          onChange={(value) =>
            onChange({
              ...imageConfig,
              width: value,
            })
          }
        />
      </label>

      <label className='flex gap-4 mb-4'>
        <span className='grow cursor-pointer'>Height</span>
        <MinMaxNumberInput
          className='p-1 px-2 w-28'
          min={Picsum.MIN_WIDTH}
          max={Picsum.MAX_WIDTH}
          label='Image Height'
          value={imageConfig.height}
          onChange={(value) =>
            onChange({
              ...imageConfig,
              height: value,
            })
          }
        />
      </label>

      <label className='flex gap-4 mb-4'>
        <span className='grow cursor-pointer'>Grayscale</span>
        <div className='w-28'>
          <input
            type='checkbox'
            className=''
            aria-label='Make image grayscale'
            value='1'
            checked={imageConfig.grayscale}
            onChange={(e) =>
              onChange({
                ...imageConfig,
                grayscale: e.target.checked,
              })
            }
          />
        </div>
      </label>

      <label className='flex gap-4 mb-4'>
        <span className='grow cursor-pointer'>Blur level</span>
        <select
          className='w-28 p-1 px-2'
          aria-label='Blur image'
          onChange={(e) =>
            onChange({
              ...imageConfig,
              blur: parseInt(e.target.value, 10) || 0,
            })
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
    </>
  );
};
