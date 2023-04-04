import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

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
    <div className='App'>
      <header>
        <h1>Browse Images</h1>
      </header>
      <main>
        <ul>
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
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </button>
          <button
            disabled={(images?.length || 0) < perPage}
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};
