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
    // Arrange
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    // Act
    const newUser = await createUserUseCase.execute(newUserInfo);

    // Assert
    expect(newUser).toBeTruthy();
    expect(newUser).toHaveProperty('name');
    expect(newUser.email).toBe(newUserInfo.email);
    expect(inMemoryUserReposiory.users.length).toBe(1);
  });

  it('should not create an user if email is already in use', async () => {
    // Arrange
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    // Act
    await createUserUseCase.execute(newUserInfo);

    // Assert
    await expect(createUserUseCase.execute(newUserInfo)).rejects.toThrow("E-mail já cadastrado");
    expect(inMemoryUserReposiory.users.length).toBe(1);
  });

  it("should correctly hash user's password", async () => {
    // Arrange
    const newUserInfo = {
      email: "johndoe@gmail.com",
      name: "john",
      password: "12345678",
    };

    // Act
    const newUser = await createUserUseCase.execute(newUserInfo);
    const passwordMatch = await compare("12345678", newUser.password);

    // Assert
    expect(passwordMatch).toBe(true);
    expect(newUser.password).not.toBe(newUserInfo.password);
  });

  it.each(['123', '1234567', 'abcdefg', '', '.', ' '])
    ('should not create an user if password is less than 8 characters: $0', async (passwordValue) => {
      // Arrange
      const newUserInfo = {
        name: 'John',
        email: 'johndoe@gmail.com',
        password: passwordValue,
      };

      // Act
      const createUserWithInvalidPassword = () => createUserUseCase.execute(newUserInfo);

      // Assert
      await expect(createUserWithInvalidPassword).rejects.toThrow("Senha invalida. Minimo 8 caracteres e maximo 16");
    });

  it.each(['123123123123123123', 'abcdefghijklmnopqr'])
    ('should not create an user if password is more than 16 characters: $0', async (passwordValue) => {
      // Arrange
      const newUserInfo = {
        name: 'John',
        email: 'johndoe@gmail.com',
        password: passwordValue,
      };

      // Act
      const createUserWithInvalidPassword = () => createUserUseCase.execute(newUserInfo);

      // Assert
      await expect(createUserWithInvalidPassword).rejects.toThrow("Senha invalida. Minimo 8 caracteres e maximo 16");
    });

  it('should not create an user if name is missing', async () => {
    // Arrange
    const newUserInfo = {
      name: '',
      email: 'johndoe@gmail.com',
      password: '12345678',
    };

    // Act
    const userWithoutName = () => createUserUseCase.execute(newUserInfo);

    // Assert
    expect(userWithoutName).rejects.toThrow('Nome invalido');
    expect(inMemoryUserReposiory.users.length).toBe(0);
  });

  it('should not create an user if email is missing', async () => {
    // Arrange
    const newUserInfo = {
      name: 'John',
      email: '',
      password: '12345678',
    };

    // Act
    const userWithoutEmail = () => createUserUseCase.execute(newUserInfo);

    // Assert
    expect(userWithoutEmail).rejects.toThrow('E-mail invalido');
    expect(inMemoryUserReposiory.users.length).toBe(0);
  });
});