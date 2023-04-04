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
  const { data: images } = useQuery('images', async () => {
    const response = await fetch(`https://picsum.photos/v2/list`);
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
            const aspect = image.width / image.height;
            return (
              <li key={image.id}>
                <figure>
                  <img
                    src={`https://picsum.photos/id/${image.id}/300/${Math.round(
                      300 / aspect
                    )}`}
                    alt={`Author ${image.author}`}
                  />
                </figure>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};
