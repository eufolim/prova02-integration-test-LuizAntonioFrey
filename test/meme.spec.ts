import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Meme Management', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.imgflip.com/';

  let response = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Meme', () => {
    it('Get memes', async () => {
      await p
        .spec()
        .get(`${baseUrl}get_memes`)
        .expectStatus(StatusCodes.OK)
        .returns('body');
    });
    it('Caption image with text', async () => {
      response = await p
        .spec()
        .post(`${baseUrl}caption_image`)
        .withHeaders('Content-Type','application/x-www-form-urlencoded')
        .withQueryParams({
          'template_id':97984,
          'username':'LuizAFrey',
          'password':'TheMemes',
          'text0':'the wizard',
          'text1':'after fireball',
        })
        .expectBodyContains(`true`)
        .returns('res.body');
        console.log(response)
    });
    it('Caption image with boxes', async () =>{
      response = await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withQueryParams({
        'template_id':87743020,
        'username':'LuizAFrey',
        'password':'TheMemes',
        })
      .withQueryParams('boxes[0][text]=One does not simply&boxes[1][text]=Make custom memes on the web via imgflip API&boxes[2][text]=And get the number of boxes wrong')
      .expectBodyContains(`true`)
      .returns('res.body')
      console.log(response);   
    });
  });
});
