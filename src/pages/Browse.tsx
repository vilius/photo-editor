import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { NavBar } from 'components/ui/NavBar';
import { picsum } from 'lib/picsum';

type Props = {
  perPage?: number;
};

export const Browse: FC<Props> = ({ perPage = 12 }) => {
  const [page, setPage] = useState(1);

  const { data: images } = useQuery(['images', page], () =>
    picsum.list({ page, limit: perPage })
  );

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
                    />
                    <figcaption>{image.author}</figcaption>
                  </figure>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='flex gap-4'>
          <button
            className='bg-sky-600 hover:bg-sky-500 disabled:bg-sky-600 disabled:opacity-50 text-white p-2 px-4'
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </button>
          <button
            className='bg-sky-600 hover:bg-sky-500 disabled:bg-sky-600 disabled:opacity-50 text-white p-2 px-4'
            disabled={(images?.length || 0) < perPage}
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            Next
          </button>
        </div>
      </article>
    </main>
  );
};
