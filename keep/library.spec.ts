import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Library Management', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://library-management-api-i6if.onrender.com/';
  let users = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('User module', () => {
    it('Get users', async () => {
      users = await p
        .spec()
        .get(`${baseUrl}/api/users`)
        .expectStatus(StatusCodes.OK)
        .returns('id');
      console.log(users);
    });
  });
});
