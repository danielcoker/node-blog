import { generateUser } from '../../../../helpers/api-integration/v1';

describe('GET /posts', () => {
  let user;
  const endpoint = '/posts';

  beforeEach(async () => {
    user = await generateUser();

    await user.post('/posts', {
      title: 'Test Blog Post',
      body: 'Body of test blog post.',
    });

    await user.post('/posts', {
      title: 'Another Test Blog Post',
      body: 'Body of another test blog post.',
    });
  });

  it('can get posts', async () => {
    const response = await user.get(endpoint);

    expect(response.data.posts.length).to.be.at.least(2);
    expect(response.data.posts[0].id).to.exist;
    expect(response.data.posts[0].title).to.exist;
    expect(response.data.posts[0].body).to.exist;
  });
});
