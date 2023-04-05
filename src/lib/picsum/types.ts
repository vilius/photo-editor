import { z } from 'zod';

export namespace Shapes {
  export const image = z.object({
    id: z.coerce.string(),
    author: z.string(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    download_url: z.string(),
  });

  export const imageArray = z.array(image);
}

export type PicsumImageResponse = z.infer<typeof Shapes.image>;
export type PicsumListResponse = PicsumImageResponse[];
