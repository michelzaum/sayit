import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryPostRepository } from '../../repositories/in-memory/InMemoryPostRepository';
import { GetPostUseCase } from './GetPostUseCase';

describe('GetPostUseCase', () => {
  let inMemoryPostRepository: InMemoryPostRepository;
  let getPostUseCase: GetPostUseCase;

  beforeEach(() => {
    inMemoryPostRepository = new InMemoryPostRepository();
    getPostUseCase = new GetPostUseCase(inMemoryPostRepository);
  });

  it('should be able to get a post by id', async () => {
    const newPost = { content: 'Hello World' };
    const createdPost = await inMemoryPostRepository.create(newPost, 'author-1');

    const result = await getPostUseCase.execute(createdPost.id);

    expect(result).toHaveProperty('id', createdPost.id);
    expect(result.content).toBe('Hello World');
  });

  it('should throw an error if post does not exist', async () => {
    await expect(getPostUseCase.execute('non-existing-id')).rejects.toThrow('Post not found');
  });
});