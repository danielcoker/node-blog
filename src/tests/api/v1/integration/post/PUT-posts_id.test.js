import { generateUser } from '../../../../helpers/api-integration/v1';

describe('PUT /posts/:id', () => {
  let user;
  let post;
  let endpoint;

  beforeEach(async () => {
    user = await generateUser();

    ({
      data: { post },
    } = await user.post('/posts', {
      title: 'Test Blog Post',
      body: 'Body of test blog post.',
    }));

    endpoint = `/posts/${post.id}`;
  });

  context('validate params', async () => {
    it('returns an error if post title is absent', async () => {
      await expect(
        user.put(endpoint, {
          body: 'Update body.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 400,
        error: 'BadRequest',
        message: 'Invalid request parameters.',
      });
    });

    it('returns an error if post title is empty', async () => {
      await expect(
        user.put(endpoint, {
          title: '',
          body: 'Update body.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 400,
        error: 'BadRequest',
        message: 'Invalid request parameters.',
      });
    });
  });

  context('can be updated', async () => {
    it('updates an existing post', async () => {
      const response = await user.put(endpoint, {
        title: 'Updated title',
        body: 'Updated body.',
      });

      expect(response.data.post.title).to.be.eql('Updated title');
      expect(response.data.post.body).to.be.eql('Updated body.');
    });
  });

  context('cannot be updated', async () => {
    it('cannot edit a non-existent post', async () => {
      await expect(
        user.put('/posts/5f818b94d1a5e53fd8ff6c56', {
          title: 'Updated title',
          body: 'Updated body.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 404,
        error: 'NotFound',
        message: 'Post does not exist.',
      });
    });

    it('cannot edit a post owned by someone else', async () => {
      const anotherUser = await generateUser();

      await expect(
        anotherUser.put(endpoint, {
          title: 'Updated title',
          body: 'Updated body.',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 401,
        error: 'NotAuthorized',
        message: 'User is not authorized to edit this post.',
      });
    });
  });
});
