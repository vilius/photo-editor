import { useState } from 'react';
import { useQuery } from 'react-query';

type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export const App = () => {
  const [page, setPage] = useState(1);

  const { data: images } = useQuery(['images', page], async () => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=100`
    );
    const json = await response.json();
    return json as PicsumImage[];
  });

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
                <figure aria-label={`Image by ${image.author}`}>
                  <img
                    src={`https://picsum.photos/id/${image.id}/300/200`}
                    alt={`Author ${image.author}`}
                  />
                  <figcaption>{image.author}</figcaption>
                </figure>
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
            disabled={page === 2}
            onClick={() => setPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};
