import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Meme Management', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.imgflip.com/get_memes';
  let memes = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Meme', () => {
    it('Get memes', async () => {
      memes = await p
        .spec()
        .get(`${baseUrl}`)
        .expectStatus(StatusCodes.OK)
        .returns('body');
      console.log(memes);
    });
  });
});
