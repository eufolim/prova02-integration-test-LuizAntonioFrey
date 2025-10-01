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
        .expectStatus(StatusCodes.OK);
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
        /* console.log(response) */
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
      /* console.log(response); */   
    });
    it('Caption image with boxes (skiping first)', async () => {
      response = await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withQueryParams({
        'template_id':61579,
        'username':'LuizAFrey',
        'password':'TheMemes',
      })
      .withQueryParams('boxes[0]&boxes[1][text]=this image has two text boxes')
      .expectBodyContains(`true`)
      .returns('res.body')
      /* console.log(response); */
    });
    it('Caption image with boxes (ignoring text)', async () => {
      response = await p  
        .spec()
        .post(`${baseUrl}caption_image`)
        .withHeaders('Content-Type','application/x-www-form-urlencoded')
        .withQueryParams({
          'template_id':61579,
          'username':'LuizAFrey',
          'password':'TheMemes',
          'text0':'the wizard',
          'text1':'after fireball',
        })
        .withQueryParams('boxes[0][text]=One does not simply&boxes[1][text]=Hide memes in the query params')
        .expectBodyContains(`true`)
        .returns('res.body');
        /* console.log(response) */
    });
    it('Attemp caption using json throgth body', async () => {
      await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/json')
      .withBody({
        template_id:61579,
        username:'LuizAFrey',
        password:'TheMemes',
        text0:'the wizard',
        text1:'after fireball',
      })
      .expectBodyContains(`false`);
    })
    it('Attempt caption using url-encoded throgth body', async () =>{
      await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withBody({
        template_id:61579,
        username:'LuizAFrey',
        password:'TheMemes',
        text0:'the wizard',
        text1:'after fireball',
      })
      .expectBodyContains(`false`);
    })
    it('Attempt caption with boxes throgth standard querry', async () => {
      response = await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withQueryParams({
        'template_id':61579,
        'username':'LuizAFrey',
        'password':'TheMemes',
        'boxes':[{"text":"test1"},{"text":"text2"}] 
      })
      .expectBodyContains(`false`);
    });
    it('Attempt caption image with fake parameter (test2)', async () => {
      response = await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withQueryParams({
        'template_id':87743020,
        'username':'LuizAFrey',
        'password':'TheMemes',
        'text0':'One does not simply',
        'text1':'Make custom memes on the web via imgflip API',
        'text2':'And get the number of boxes wrong'
      })
      .expectBodyContains(`true`)
      .returns('res.body')
      /* console.log(response); */
    })
    it('Attempt caption image with missing parameter', async () => {
      response = await p
      .spec()
      .post(`${baseUrl}caption_image`)
      .withHeaders('Content-Type','application/x-www-form-urlencoded')
      .withQueryParams({
        'template_id':87743020,
        'username':'LuizAFrey',
        'password':'TheMemes',
        'text1':'Make custom memes on the web via imgflip API',
      })
      .expectBodyContains(`true`)
      .returns('res.body')
      /* console.log(response); */
    })
  });
});
