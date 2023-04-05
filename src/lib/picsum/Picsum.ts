import { Shapes, PicsumListResponse } from './types';

const MAX_LIMIT = 100;

type ListParams = {
  page: number;
  limit: number;
};

export class Picsum {
  private version: 'v2';

  static readonly MAX_LIMIT = 100;

  static readonly DEFAULT_LIST_PARAMS: ListParams = {
    page: 1,
    limit: 12,
  };

  constructor(config?: { version: 'v2' }) {
    this.version = config?.version || 'v2';
  }

  /**
   * @param page  page number
   * @param limit number of images per page, max 100
   */
  async list(options?: Partial<ListParams>): Promise<PicsumListResponse> {
    const { page, limit } = { ...Picsum.DEFAULT_LIST_PARAMS, ...options };

    if (limit > MAX_LIMIT) {
      throw new Error(`Limit cannot be greater than ${Picsum.MAX_LIMIT}`);
    }

    const response = await fetch(
      `https://picsum.photos/${this.version}/list?page=${page}&limit=${limit}`
    );

    return this.#parseResult(response);
  }

  async #parseResult(response: Response): Promise<PicsumListResponse> {
    const data: unknown = await response.json();

    return Shapes.imageArray.parse(data);
  }
}
