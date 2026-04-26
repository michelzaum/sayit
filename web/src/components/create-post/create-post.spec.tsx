import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCreatePost } from './useCreatePost';
import { MockedProvider } from '@apollo/client/testing/react';
import { MemoryRouter } from 'react-router';

const mockCreatePost = vi.fn();

vi.mock("@apollo/client/react", async () => {
  const actual = (await vi.importActual("@apollo/client/react")) as object;
  return {
    ...actual,
    useMutation: () => [mockCreatePost, {}],
  };
});

describe('onCreatePostSubmit', () => {
  const event = {
    preventDefault: vi.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>;

  const { result } = renderHook(() => useCreatePost(), {
    wrapper: ({ children }) => (
      <MockedProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </MockedProvider>
    )
  });

  it('should not call createPost if postContent is empty', async () => {
    // Arrange
    result.current.postContentRef.current.value = '';

    // Act
    await result.current.onCreatePostSubmit(event);

    // Assert
    expect(mockCreatePost).not.toHaveBeenCalled();
  });
});