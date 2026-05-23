import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

import { InMemoryPostRepository } from '../../repositories/in-memory/InMemoryPostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

describe('CreatePostUseCase', () => {
  let inMemoryPostRepository: InMemoryPostRepository;
  let createPostUseCase: CreatePostUseCase;
  const authenticatedUserId = 'abcd-1234';

  beforeEach(() => {
    inMemoryPostRepository = new InMemoryPostRepository();
    createPostUseCase = new CreatePostUseCase(inMemoryPostRepository);

    vi.clearAllMocks();
  });

  it('should create a new post correctly', async () => {
    // Arrange
    const newPost = {
      content: 'New post content',
    };

    vi.spyOn(jwt, 'verify').mockReturnValue({ sub: authenticatedUserId } as any);

    // Act
    const result = await createPostUseCase.execute(newPost, authenticatedUserId);

    // Assert
    expect(result).toHaveProperty('id');
    expect(result.content).toBe('New post content');

    const storedPosts = await inMemoryPostRepository.getAll();
    expect(storedPosts).toHaveLength(1);
    expect(storedPosts[0]).toHaveProperty('authorId', authenticatedUserId);
  });
});
