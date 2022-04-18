const request = require('supertest');

const app = require('../loaders');

describe('Contracts', () => {
  describe('/v1/api/contracts/:id', () => {

    it('should return 404 when contract not found', async () => {
      await request(app)
        .get('/v1/api/contracts/199')
        .set('profile_id', '5')
        .expect(404);
    });

    it('should return contract when profile_id header matches with client', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/contracts/1')
        .set('profile_id', '1');

      expect(statusCode).toEqual(200);
      expect(body.data).toMatchObject({
        id: 1,
        terms: 'bla bla bla',
        status: 'terminated',
        ClientId: 1,
        ContractorId: 5,
      });
    });

    it('should return contract when profile_id header matches with contractor', async () => {
      const { statusCode, body } = await request(app)
        .get('/v1/api/contracts/1')
        .set('profile_id', '5');

      expect(statusCode).toEqual(200);
      expect(body.data).toMatchObject({
        id: 1,
        terms: 'bla bla bla',
        status: 'terminated',
        ClientId: 1,
        ContractorId: 5,
      });
    });
  });

  describe('/contracts', () => {
    it('should return not terminated contracts for the client', async () => {
        const actualValue = [
          {
              "id": 7,
              "terms": "bla bla bla",
              "status": "in_progress",
              "createdAt": "2022-04-18T12:27:17.866Z",
              "updatedAt": "2022-04-18T12:27:17.866Z",
              "ContractorId": 7,
              "ClientId": 4
          },
          {
              "id": 8,
              "terms": "bla bla bla",
              "status": "in_progress",
              "createdAt": "2022-04-18T12:27:17.866Z",
              "updatedAt": "2022-04-18T12:27:17.866Z",
              "ContractorId": 6,
              "ClientId": 4
          },
          {
              "id": 9,
              "terms": "bla bla bla",
              "status": "in_progress",
              "createdAt": "2022-04-18T12:27:17.866Z",
              "updatedAt": "2022-04-18T12:27:17.866Z",
              "ContractorId": 8,
              "ClientId": 4
          }
      ]
      const { statusCode, body } = await request(app)
        .get('/v1/api/contracts')
        .set('profile_id', '4');

      expect(statusCode).toEqual(200);
      expect(body.data).toHaveLength(3);
      expect(body.data).toEqual(actualValue);
    });
  });
});
