import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { NavBar } from 'components/ui/NavBar';
import { picsum, imageSrc } from 'lib/picsum';

import { paths } from 'router';
import { appConfig } from 'appConfig';

const { perPage, thumbnailSize } = appConfig;

export const Browse = () => {
  const { pageNumber } = useParams();

  let page = 1;
  const pageParam = z.coerce.number().min(1).safeParse(pageNumber);

  if (pageParam.success) {
    page = pageParam.data;
  }

  const { data: images } = useQuery(['images', page], () =>
    picsum.list({ page, limit: perPage })
  );

  const hasPrevious = page > 1;
  const hasNext = (images?.length || 0) >= perPage;

  return (
    <main className='p-4 px-8'>
      <NavBar title={`Browse Images${page > 1 ? ` [Page ${page}]` : ''}`} />
      <article>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4'>
          {images?.map((image) => (
            <li key={image.id}>
              <Link to={paths.editImagePath(image.id)}>
                <figure aria-label={`Image by ${image.author}`}>
                  <img
                    src={imageSrc(image.id, {
                      width: thumbnailSize.width,
                      height: thumbnailSize.height,
                    })}
                    alt={`Author ${image.author}`}
                    width={thumbnailSize.width}
                    height={thumbnailSize.height}
                    className='d-block'
                  />
                  <figcaption>{image.author}</figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex gap-4'>
          <Link
            role='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4'
            style={!hasPrevious ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            to={paths.browsePagePath(page - 1)}
            aria-disabled={!hasPrevious}
          >
            Previous
          </Link>
          <Link
            role='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4'
            style={!hasNext ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            to={paths.browsePagePath(page + 1)}
            aria-disabled={!hasNext}
          >
            Next
          </Link>
        </div>
      </article>
    </main>
  );
};
