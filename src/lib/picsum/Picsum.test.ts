import nock from 'nock';
import { mockPicsum, imageData } from 'testsHelpers';

import { Picsum } from './Picsum';

const picsum = new Picsum();

describe('Picsum', () => {
  beforeEach(mockPicsum);

  describe('list', () => {
    it('returns a list of images', async () => {
      const result = await picsum.list({ page: 1, limit: 2 });

      expect(result).toHaveLength(2);
    });

    it('throws an error when limit is greater than 100', async () => {
      await expect(picsum.list({ page: 1, limit: 101 })).rejects.toThrow(
        'Limit cannot be greater than 100'
      );
    });

    it('paginates', async () => {
      const result1 = await picsum.list({ page: 1, limit: 2 });
      const result2 = await picsum.list({ page: 2, limit: 2 });

      expect(result1).toHaveLength(2);
      expect(result1[0].id).toBe('1');
      expect(result1[1].id).toBe('2');

      expect(result2).toHaveLength(1);
      expect(result2[0].id).toBe('3');
    });

    it('limits the number of results', async () => {
      const result = await picsum.list({ page: 1, limit: 1 });

      expect(result).toHaveLength(1);
    });

    it('throws an error when the response contains unexpected schema', async () => {
      nock.cleanAll();
      nock('https://picsum.photos')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .get('/v2/list')
        .query(true)
        .reply(200, () => {
          const response: Partial<typeof imageData[0]>[] = [imageData[1]];
          delete response[0].download_url;
          return response;
        });

      await expect(picsum.list({ page: 1, limit: 1 })).rejects.toThrow();
    });
  });
});
