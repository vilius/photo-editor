import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { NavBar } from 'components/ui/NavBar';
import { picsum } from 'lib/picsum';

type Props = {
  perPage?: number;
};

export const Browse: FC<Props> = ({ perPage = 12 }) => {
  const { pageNumber } = useParams();

  let page: number = 1;
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
      <NavBar title='Browse Images' />
      <article>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4'>
          {images?.map((image) => {
            return (
              <li key={image.id}>
                <Link to={`/edit/${image.id}`}>
                  <figure aria-label={`Image by ${image.author}`}>
                    <img
                      src={`https://picsum.photos/id/${image.id}/300/200`}
                      alt={`Author ${image.author}`}
                      width={300}
                      height={200}
                      className='d-block'
                    />
                    <figcaption>{image.author}</figcaption>
                  </figure>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='flex gap-4'>
          <Link
            role='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4'
            style={!hasPrevious ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            to={`/page/${page - 1}`}
            aria-disabled={!hasPrevious}
          >
            Previous
          </Link>
          <Link
            role='button'
            className='bg-sky-600 hover:bg-sky-500 text-white p-2 px-4'
            style={!hasNext ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            to={`/page/${page + 1}`}
            aria-disabled={!hasNext}
          >
            Next
          </Link>
        </div>
      </article>
    </main>
  );
};
