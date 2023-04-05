import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { NavBar } from 'components/ui/NavBar';
import { LinkButton } from 'components/ui/LinkButton';
import { picsum, imageSrc } from 'lib/picsum';
import { useSafeParam } from 'hooks/useSafeParam';

import { paths } from 'routes';
import { appConfig } from 'appConfig';

const { perPage, thumbnailSize } = appConfig;

export const Browse = () => {
  const page = useSafeParam('pageNumber', z.coerce.number().min(1), 1);

  const placeHolder = {
    id: '',
    author: '',
    width: 300,
    height: 200,
    url: '',
    download_url: '',
  };

  const { data: images, isPlaceholderData } = useQuery(
    ['images', page],
    () => picsum.list({ page, limit: perPage }),
    {
      keepPreviousData: true,
      placeholderData: Array(perPage)
        .fill(0)
        .map((_, index) => ({
          ...placeHolder,
          id: `placeholder-${index}`,
        })),
    }
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
                  <div className='aspect-[3/2] mb-1 relative bg-gray-300'>
                    {!isPlaceholderData && (
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
                    )}
                  </div>
                  <figcaption className='min-h-[24px]'>
                    {image.author}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex gap-4'>
          <LinkButton
            disabled={!hasPrevious}
            to={
              page === 2 ? paths.browsePath() : paths.browsePagePath(page - 1)
            }
          >
            Previous
          </LinkButton>
          <LinkButton disabled={!hasNext} to={paths.browsePagePath(page + 1)}>
            Next
          </LinkButton>
        </div>
      </article>
    </main>
  );
};
