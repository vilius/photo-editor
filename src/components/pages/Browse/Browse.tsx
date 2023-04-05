import { useQuery } from 'react-query';
import { z } from 'zod';

import { NavBar, LinkButton } from 'components/ui';
import { picsumClient } from 'lib/picsum';
import { useSafeParam } from 'hooks/useSafeParam';

import { paths } from 'routes';
import { appConfig } from 'appConfig';

import { placeholderImages } from './helpers';
import { Thumbnail } from './Thumbnail';

const { perPage } = appConfig;

export const Browse = () => {
  const page = useSafeParam('pageNumber', z.coerce.number().min(1), 1);

  const { data: images, isPlaceholderData } = useQuery(
    ['images', page],
    () => picsumClient.list({ page, limit: perPage }),
    {
      keepPreviousData: true,
      placeholderData: placeholderImages,
    }
  );

  const hasPrevious = page > 1;
  const hasNext = (images?.length || 0) >= perPage;

  return (
    <main className='p-4 px-8'>
      <NavBar title={`Browse Images${page > 1 ? ` [Page ${page}]` : ''}`} />
      <article>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4'>
          {images?.map(({ id, author }) => (
            <li key={id}>
              <Thumbnail
                url={paths.editImagePath(id)}
                imageId={id}
                author={author}
                isPlaceholder={isPlaceholderData}
              />
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
