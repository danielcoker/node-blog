import { generateUser } from '../../../../helpers/api-integration/v1';

describe('POST /posts', () => {
  let user;
  const endpoint = '/posts';

  beforeEach(async () => {
    user = await generateUser();
  });

  context('validates params', async () => {
    it('returns an error if post title is absent', async () => {
      await expect(
        user.post(endpoint, {
          body: 'This is the body of the post.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 400,
        error: 'BadRequest',
        message: 'Invalid request parameters.',
      });
    });

    it('returns an error if post title is empty', async () => {
      await expect(
        user.post(endpoint, {
          title: '',
          body: 'This is the body of the post.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 400,
        error: 'BadRequest',
        message: 'Invalid request parameters.',
      });
    });
  });

  context('creates post', async () => {
    it('creates a new post', async () => {
      const response = await user.post(endpoint, {
        title: 'My First Post',
        body: 'This is the body of my first post.',
      });

      expect(response.data.post.title).to.be.eql('My First Post');
      expect(response.data.post.body).to.be.eql('This is the body of my first post.');
    });
  });
});
