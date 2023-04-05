import { appConfig } from 'appConfig';
import { PicsumImageResponse } from 'lib/picsum/types';

const imagePlaceholderData: PicsumImageResponse = {
  id: '',
  author: '',
  width: 300,
  height: 200,
  url: '',
  download_url: '',
};

export const placeholderImages = Array(appConfig.perPage)
  .fill(0)
  .map((_, index) => ({
    ...imagePlaceholderData,
    id: `p-${index}`,
  }));
