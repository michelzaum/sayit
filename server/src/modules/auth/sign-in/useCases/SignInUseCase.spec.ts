import { InMemoryUserReposiory } from "@/modules/user/repositories/in-memory/InMemoryUserRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { SignInUseCase } from "./SignInUseCase";

describe("SignInUseCase", () => {
  let inMemoryUserRepository: InMemoryUserReposiory;
  let signInUseCase: SignInUseCase;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserReposiory();
    signInUseCase = new SignInUseCase(inMemoryUserRepository);
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
});
