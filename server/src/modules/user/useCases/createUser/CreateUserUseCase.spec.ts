import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

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

  it('should not create an user if email is already in use', async () => {
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    await createUserUseCase.execute(newUserInfo);

    expect(createUserUseCase.execute(newUserInfo)).rejects.toThrow("E-mail já cadastrado");
    expect(inMemoryUserReposiory.users.length).toBe(1);
  });

  it("should correctly hash user's password", async () => {
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    const newUser = await createUserUseCase.execute(newUserInfo);
    const passwordMatch = await compare("12345678", newUser.password);

    expect(passwordMatch).toBe(true);
    expect(newUser.password).not.toBe(newUserInfo.password);
  });
});