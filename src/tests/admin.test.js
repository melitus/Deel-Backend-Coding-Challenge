const request = require('supertest');
const app = require('../loaders');

describe('Admin', () => {
  describe('/admin/best-profession', () => {
    it('should return profession with the highest income within given time range', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/admin/best-profession')
        .query({ startDate: '2020-08-15T19:11:26.737Z' })
        .query({ endDate: '2020-08-17T19:11:26.737Z' });
      expect(statusCode).toEqual(200);
      expect(body.data).toEqual(
        expect.objectContaining({
          profession: 'Programmer',
          earned: 2562,
        }),
      );
    });

    it('should return null if there are no jobs within given time range', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/admin/best-profession')
        .query({ startDate: '2021-08-10T09:00:00.000Z' })
        .query({ endDate: '2021-08-16T23:59:59.000Z' });

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual('No best profession found');
    });
  });

  describe('/admin/best-clients', () => {
    it('should return list of clients who paid most within given time range', async () => {
      const actualValue = [
        {
            "id": 4,
            "fullName": "Ash Kethcum",
            "paid": 2020
        },
        {
            "id": 1,
            "fullName": "Harry Potter",
            "paid": 421
        }
    ]
      const { statusCode, body } = await request(app)
        .get('/v1/api/admin/best-clients')
        .query({ startDate: '2020-08-15T19:11:26.737Z' })
        .query({ endDate: '2020-08-17T19:11:26.737Z' });

        expect(statusCode).toEqual(200);
      expect(body.data).toEqual((actualValue));
    });

    it('should limit the list by query param', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/admin/best-clients')
        .query({ startDate: '2020-08-15T19:11:26.737Z' })
        .query({ endDate: '2020-08-17T19:11:26.737Z' })
        .query({ limit: 1 });

      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(1);
      expect(body.data[0]).toEqual(expect.objectContaining({ fullName: 'Ash Kethcum', id: 4, paid: 2020 }));
    });

    it('should return [] if there are no jobs within given time range', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/admin/best-clients')
        .query({ startDate: '2021-08-10T09:00:00.000Z' })
        .query({ endDate: '2021-08-16T23:59:59.000Z' });

      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(0);
    });
  });
});
