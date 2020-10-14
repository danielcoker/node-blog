import { generateUser } from '../../../../helpers/api-integration/v1';

describe('DELETE /posts/:id', () => {
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

  context('can be deleted', async () => {
    it('deletes a post', async () => {
      await user.del(endpoint);

      await expect(user.get(endpoint)).to.eventually.be.rejected.and.eql({
        code: 404,
        error: 'NotFound',
        message: 'Post does not exist.',
      });
    });
  });

  context('cannot be deleted', async () => {
    it('cannot delete a non-existent post', async () => {
      await expect(user.del('/posts/5f818b94d1a5e53fd8ff6c56')).to.eventually.be.rejected.and.eql({
        code: 404,
        error: 'NotFound',
        message: 'Post does not exist.',
      });
    });

    it('cannot delete a post owned by someone else', async () => {
      const anotherUser = await generateUser();

      await expect(anotherUser.del(endpoint)).to.eventually.be.rejected.and.eql({
        code: 401,
        error: 'NotAuthorized',
        message: 'User is not authorized to delete this post.',
      });
    });
  });
});
