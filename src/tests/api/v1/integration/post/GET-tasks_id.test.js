import { generateUser } from '../../../../helpers/api-integration/v1';

describe('GET /posts/:id', () => {
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

  it('can get post', async () => {
    const response = await user.get(endpoint);

    expect(response.data.post.id).to.exist;
    expect(response.data.post.title).to.exist;
    expect(response.data.post.body).to.exist;
  });

  it('cannot get a non-existent post', async () => {
    await expect(user.get('/posts/5f818b94d1a5e53fd8ff6c56')).to.eventually.be.rejected.and.eql({
      code: 404,
      error: 'NotFound',
      message: 'Post does not exist.',
    });
  });
});
