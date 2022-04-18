const request = require('supertest');

const app = require('../loaders');

describe('Jobs', () => {
  describe('Unpaid jobs', () => {
    it('should return only unpaid jobs', async () => {
        const actualValue = [{"ContractId": 2, "createdAt": "2022-04-17T13:29:05.340Z", "description": "work", "id": 2, "paid": null, "paymentDate": null, "price": 201, "updatedAt": "2022-04-17T13:29:05.340Z"}]
      const { statusCode, body } = await request(app)
        .get('/v1/api/jobs/unpaid')
        .set('profile_id', '1');
      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(1);
      expect(body.data).toEqual(actualValue)
    });

    it('should return unpaid jobs only for in_progress contracts', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/jobs/unpaid')
        .set('profile_id', '8');

      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(0);
    });

    it('should return [] when profile_id does not match client or contractor', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/jobs/unpaid')
        .set('profile_id', '19');

      expect(statusCode).toEqual(401);
    //   expect(body.data).toHaveLength(0);
    });
  });

  describe('/jobs/:id/pay', () => {
    it('should return 404 when job is not found', async () => {
      const { statusCode, body } = await request(app)
        .post('/v1/api/jobs/3/pay')
        .set('profile_id', '1');

      expect(statusCode).toEqual(404);
    });
  });
});
