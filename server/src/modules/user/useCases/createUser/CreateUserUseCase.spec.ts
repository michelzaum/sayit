import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUserReposiory } from '../../repositories/in-memory/InMemoryUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let inMemoryUserReposiory: InMemoryUserReposiory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUserReposiory = new InMemoryUserReposiory();
    createUserUseCase = new CreateUserUseCase(inMemoryUserReposiory);
  });

  it('should create the user correctly', async () => {
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    const newUser = await createUserUseCase.execute(newUserInfo);

    expect(newUser).toBeTruthy();
    expect(newUser).toHaveProperty('name');
    expect(newUser.email).toBe(newUserInfo.email);
    expect(inMemoryUserReposiory.users.length).toBe(1);
  });
});