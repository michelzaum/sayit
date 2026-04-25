import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserReposiory } from "@/modules/user/repositories/in-memory/InMemoryUserRepository";
import { SignInUseCase } from "./SignInUseCase";
import { CreateUserUseCase } from "@/modules/user/useCases/createUser/CreateUserUseCase";

describe("SignInUseCase", () => {
  let inMemoryUserRepository: InMemoryUserReposiory;
  let signInUseCase: SignInUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserReposiory();
    signInUseCase = new SignInUseCase(inMemoryUserRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should throw an error if email is not found", async () => {
    // Arrange
    const userEmail = "test@mail.com";
    const user = {
      email: userEmail,
      password: "12345678",
    };

    // Act
    const invalidUser = async () => signInUseCase.execute(user);

    // Assert
    await expect(invalidUser).rejects.toThrow(
      `User with e-mail ${userEmail} not found`,
    );
  });

  it.each(["test", "test.com", "@", "@.com", ""])(
    "should throw an error if email is invalid: $0",
    async (values) => {
      // Arrange
      const user = {
        email: values,
        password: "12345678",
      };

      // Act
      const invalidUser = async () => signInUseCase.execute(user);

      // Assert
      await expect(invalidUser).rejects.toThrow(`E-mail invalido`);
    },
  );

  it("should call getByEmail with the user's email that is trying to sign-in", async () => {
    // Arrange
    const user = {
      name: "John",
      email: "john@mail.com",
      password: "12345678",
    };
    const getByEmailSpy = vi.spyOn(inMemoryUserRepository, "getByEmail");
    const newUser = await createUserUseCase.execute(user);

    // Act
    const userToSignIn = await signInUseCase.execute(user);

    // Assert
    expect(getByEmailSpy).toHaveBeenCalledWith(newUser.email);
    expect(userToSignIn).toBeDefined();
  });
});
