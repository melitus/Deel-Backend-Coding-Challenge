const request = require('supertest');

const app = require('../loaders');

describe('Jobs', () => {
  describe('Unpaid jobs', () => {
    it('should return only unpaid jobs', async () => {
        const actualValue = [
          {
              "id": 3,
              "description": "work",
              "price": 202,
              "paid": null,
              "paymentDate": null,
              "createdAt": "2022-04-18T12:27:17.866Z",
              "updatedAt": "2022-04-18T12:27:17.866Z",
              "ContractId": 3
          },
          {
              "id": 4,
              "description": "work",
              "price": 200,
              "paid": null,
              "paymentDate": null,
              "createdAt": "2022-04-18T12:27:17.866Z",
              "updatedAt": "2022-04-18T12:27:17.866Z",
              "ContractId": 4
          }
      ]
      const { statusCode, body } = await request(app)
        .get('/v1/api/jobs/unpaid')
        .set('profile_id', '2');
      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(2);
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
