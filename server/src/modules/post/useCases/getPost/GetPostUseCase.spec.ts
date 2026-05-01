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
    // Arrange
    const newPost = { content: 'Hello World' };
    const createdPost = await inMemoryPostRepository.create(newPost, 'author-1');

    // Act
    const result = await getPostUseCase.execute(createdPost.id);

    // Assert
    expect(result).toHaveProperty('id', createdPost.id);
    expect(result.content).toBe('Hello World');
  });

  it('should throw an error if post does not exist', async () => {
    // Assert
    await expect(getPostUseCase.execute('non-existing-id')).rejects.toThrow('Post not found');
  });

  it('should return the correct post when multiple posts exist', async () => {
    // Arrange
    await inMemoryPostRepository.create({ content: 'Post 1' }, 'author-1');
    const post2 = await inMemoryPostRepository.create({ content: 'Post 2' }, 'author-2');
    await inMemoryPostRepository.create({ content: 'Post 3' }, 'author-3');

    // Act
    const result = await getPostUseCase.execute(post2.id);

    // Assert
    expect(result).toHaveProperty('id', post2.id);
    expect(result.content).toBe('Post 2');
    expect(result).toHaveProperty('authorId', 'author-2');
  });
});