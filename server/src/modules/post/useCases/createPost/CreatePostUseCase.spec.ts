import { beforeAll, describe, it } from 'vitest';
import { InMemoryPostRepository } from '../../repositories/in-memory/InMemoryPostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

describe('CreatePostUseCase', () => {
  let inMemoryPostRepository: InMemoryPostRepository;
  let createPostUseCase: CreatePostUseCase;

  beforeAll(() => {
    inMemoryPostRepository = new InMemoryPostRepository();
    createPostUseCase = new CreatePostUseCase(inMemoryPostRepository);
  });
});