const request = require('supertest');

const app = require('../loaders');

describe('Balances', () => {
  describe('/balances/deposit/:userId', () => {
    it('should increase clients balance', async () => {
      const { statusCode, body } = await request(app)
        .post('/v1/api/balances/deposit/2')
        .send({ amount: 2 });
         expect(statusCode).toEqual(200);
    });
    
    it('should return 400 if deposit exceeds the threshold of 0.25 of unpaid jobs sum', async () => {
      const { statusCode, body } = await request(app)
        .post('/v1/api/balances/deposit/2')
        .send({ amount: 200.6 });

      expect(statusCode).toEqual(400);
      expect(body.message).toEqual('Maximum deposit amount reached.: Deposit 200.6 is more than 25% of client 2 total of jobs to pay');
    });
  });
});
