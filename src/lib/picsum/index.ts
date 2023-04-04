type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const MAX_LIMIT = 100;

class Picsum {
  private version: 'v2';
  private maxLimit = 100;

  constructor(config?: { version: 'v2' }) {
    this.version = config?.version || 'v2';
  }

  /**
   * @param page  page number
   * @param limit number of images per page, max 100
   */
  async list({ page = 1, limit = 30 }: { page?: number; limit?: number }) {
    if (limit > MAX_LIMIT) {
      throw new Error(`Limit cannot be greater than ${this.maxLimit}`);
    }

    const response = await fetch(
      `https://picsum.photos/${this.version}/list?page=${page}&limit=${limit}`
    );

    return this._parseResult(response);
  }

  private async _parseResult(response: Response): Promise<PicsumImage[]> {
    const data: unknown = await response.json();

    return data as PicsumImage[];
  }
}

export const picsum = new Picsum();
