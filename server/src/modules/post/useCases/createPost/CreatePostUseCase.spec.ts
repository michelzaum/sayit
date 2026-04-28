import { IncomingMessage } from 'node:http';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';

import { InMemoryPostRepository } from '../../repositories/in-memory/InMemoryPostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

describe('CreatePostUseCase', () => {
  let inMemoryPostRepository: InMemoryPostRepository;
  let createPostUseCase: CreatePostUseCase;

  beforeAll(() => {
    inMemoryPostRepository = new InMemoryPostRepository();
    createPostUseCase = new CreatePostUseCase(inMemoryPostRepository);
  });

  it('should create a new post correctly', async () => {
    // Arrange
    const newPost = {
      content: 'New post content',
    };

    const mockRequest = {
      headers: {
        cookie: 'accessToken=mock_token_123'
      }
    } as unknown as IncomingMessage;

    vi.spyOn(jwt, 'verify').mockReturnValue({ sub: 'author-id-123' } as any);

    // Act
    const result = await createPostUseCase.execute(newPost, mockRequest);

    // Assert
    expect(result).toHaveProperty('id');
    expect(result.content).toBe('New post content');

    const storedPosts = await inMemoryPostRepository.getAll();
    expect(storedPosts).toHaveLength(1);
    expect(storedPosts[0]).toHaveProperty('authorId', 'author-id-123');
  });
});
