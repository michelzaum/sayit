import { IncomingMessage } from 'node:http';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

import { InMemoryPostRepository } from '../../repositories/in-memory/InMemoryPostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

describe('CreatePostUseCase', () => {
  let inMemoryPostRepository: InMemoryPostRepository;
  let createPostUseCase: CreatePostUseCase;

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

  it('should throw an error if no cookie is found in request', async () => {
    // Arrange
    const newPost = {
      content: 'New post content',
    };

    const mockRequest = {
      headers: {
        cookie: ''
      }
    } as unknown as IncomingMessage;

    // Act
    const result = async () => await createPostUseCase.execute(newPost, mockRequest);

    // Assert
    await expect(result()).rejects.toThrow();
    expect(inMemoryPostRepository.postList.length).toBe(0);
  });

  it('should throw an error if the token is invalid', async () => {
    // Arrange
    const newPost = {
      content: 'New post content',
    };

    const mockRequest = {
      headers: {
        cookie: 'accessToken=invalid_token_123'
      }
    } as unknown as IncomingMessage;

    vi.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Act
    const result = async () => await createPostUseCase.execute(newPost, mockRequest);

    // Assert
    await expect(result()).rejects.toThrow();
    expect(inMemoryPostRepository.postList.length).toBe(0);
  });

  it('should throw an error if the token does not contain a sub value', async () => {
    // Arrange
    const newPost = {
      content: 'New post content',
    };

    const mockRequest = {
      headers: {
        cookie: 'accessToken=mock_token_without_sub'
      }
    } as unknown as IncomingMessage;

    vi.spyOn(jwt, 'verify').mockReturnValue({ somethingElse: 'value' } as any);

    // Act
    const result = async () => await createPostUseCase.execute(newPost, mockRequest);

    // Assert
    await expect(result()).rejects.toThrow("Invalid access token. No 'sub' value found.");
    expect(inMemoryPostRepository.postList.length).toBe(0);
  });
});
