import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { toast } from 'sonner';
import { renderHook } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';

import { useCreatePost } from './useCreatePost';

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

  beforeEach(() => {
    vi.clearAllMocks();
  })

  it('should not call createPost if postContent is empty', async () => {
    // Arrange
    result.current.postContentRef.current.value = '';

    // Act
    await result.current.onCreatePostSubmit(event);

    // Assert
    expect(mockCreatePost).not.toHaveBeenCalled();
  });

  it('should call toast.error function if createPost got an error', async () => {
    // Arrange
    const errorSpy = vi.spyOn(toast, 'error');
    mockCreatePost.mockRejectedValueOnce(new Error());
    result.current.postContentRef.current.value = 'Post content';

    // Act
    await result.current.onCreatePostSubmit(event);

    // Assert
    expect(errorSpy).toHaveBeenCalledWith('Erro ao criar o post. Tente novamente', { dismissible: true });
  });

  it('should call createPost if postContent has a value', async () => {
    // Arrange
    result.current.postContentRef.current.value = 'Post content';
    const successSpy = vi.spyOn(toast, 'success');

    // Act
    await result.current.onCreatePostSubmit(event);

    // Assert
    expect(mockCreatePost).toHaveBeenCalledTimes(1);
    expect(successSpy).toHaveBeenCalledWith('Post criado com sucesso!', { dismissible: true });
  });
});