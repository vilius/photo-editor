import { FC } from 'react';
import { Link } from 'react-router-dom';

import { imageSrc } from 'lib/picsum';

import { appConfig } from 'appConfig';

const { thumbnailSize } = appConfig;

type Props = {
  imageId: string;
  url: string;
  author: string;
  isPlaceholder: boolean;
};

export const Thumbnail: FC<Props> = ({
  imageId,
  url,
  author,
  isPlaceholder,
}) => (
  <Link to={url}>
    <figure aria-label={`Image by ${author}`}>
      <div className='aspect-[3/2] mb-1 relative bg-gray-300'>
        {!isPlaceholder && (
          <img
            src={imageSrc(imageId, {
              width: thumbnailSize.width,
              height: thumbnailSize.height,
            })}
            alt={`Author ${author}`}
            width={thumbnailSize.width}
            height={thumbnailSize.height}
            className='d-block'
          />
        )}
      </div>
      <figcaption className='min-h-[24px]'>{author}</figcaption>
    </figure>
  </Link>
);
