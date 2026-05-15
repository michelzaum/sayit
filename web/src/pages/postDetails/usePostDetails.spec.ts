import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { toast } from 'sonner';
import { act, renderHook } from '@testing-library/react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { useSearchParams } from 'react-router';
import { usePostDetails } from './usePostDetails';
import { useStore } from '../../store/store';
import { CREATE_COMMENT } from './mutations/createComment';
import { DELETE_COMMENT } from './mutations/deleteComment';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(() => [{ get: vi.fn().mockReturnValue('1') }]),
}));

vi.mock('@apollo/client/react', () => ({
  useLazyQuery: vi.fn().mockReturnValue([vi.fn()]),
  useMutation: vi.fn().mockReturnValue([vi.fn(), { loading: false }]),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../store/store', () => ({
  useStore: vi.fn((selector) => {
    const state = {
      addPostComment: vi.fn(),
      updatePostComment: vi.fn(),
      removePostComment: vi.fn(),
      feedPostsList: [{ id: '1', content: 'Test Post' }],
      loggedUserId: 'user-1',
      commentsByPost: { '1': [] },
      setPostDetailsComments: vi.fn(),
    };
    return selector(state);
  }),
}));

describe('usePostDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => usePostDetails());

    expect(result.current.postDetails).toEqual({ id: '1', content: 'Test Post' });
    expect(result.current.postDetailsComments).toEqual([]);
    expect(result.current.isUpdateCommentModalOpen).toBe(false);
    expect(result.current.isDeleteCommentModalOpen).toBe(false);
    expect(result.current.loggedUserId).toBe('user-1');
  });

  it('should start postDetailsComments with the correct comments by post array', () => {
    // Arrange
    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: vi.fn(),
        updatePostComment: vi.fn(),
        removePostComment: vi.fn(),
        feedPostsList: [{ id: '1', content: 'Different Post' }],
        loggedUserId: 'user-99',
        commentsByPost: { '1': [{ id: 'c1', content: 'cool' }] },
        setPostDetailsComments: vi.fn(),
      };
      return selector(state);
    });
    const { result } = renderHook(() => usePostDetails());

    // act
    const postComments = result.current.postDetailsComments;

    // Assert
    expect(postComments).toEqual([{ id: 'c1', content: 'cool' }]);
  });

  it('should open update comment modal and set states correctly', () => {
    // Arrange
    const { result } = renderHook(() => usePostDetails());

    // Act
    act(() => {
      result.current.openUpdateCommentModal('comment-123', 'Old comment content');
    });

    // Assert
    expect(result.current.isUpdateCommentModalOpen).toBe(true);
    expect(result.current.updatedCommentContent).toBe('Old comment content');
  });

  it('should update the apollo cache to increment commentsCount when createComment is called', () => {
    // Arrange
    renderHook(() => usePostDetails());

    const createCommentCall = (useMutation as unknown as Mock).mock.calls.find(
      (call) => call[0] === CREATE_COMMENT
    );

    const options = createCommentCall[1];

    const cacheMock = {
      identify: vi.fn().mockReturnValue('Post:1'),
      modify: vi.fn(),
    };

    // Act
    options.update(cacheMock);

    // Assert
    expect(cacheMock.identify).toHaveBeenCalledWith({ __typename: 'Post', id: '1' });
    expect(cacheMock.modify).toHaveBeenCalledWith({
      id: 'Post:1',
      fields: {
        commentsCount: expect.any(Function),
      },
    });

    const modifyArgs = cacheMock.modify.mock.calls[0][0];
    const newCount = modifyArgs.fields.commentsCount(5);
    expect(newCount).toBe(6);

    const newCountFallback = modifyArgs.fields.commentsCount(undefined);
    expect(newCountFallback).toBe(1);
  });

  it('should open delete comment modal correctly', () => {
    // Arrange
    const { result } = renderHook(() => usePostDetails());

    // Act
    act(() => {
      result.current.openDeleteCommentModal('comment-456');
    });

    // Assert
    expect(result.current.isDeleteCommentModalOpen).toBe(true);
  });

  it('should close delete comment modal correctly', () => {
    // Arrange
    const { result } = renderHook(() => usePostDetails());

    // Act
    act(() => {
      result.current.closeDeleteCommentModal();
    });

    // Assert
    expect(result.current.isDeleteCommentModalOpen).toBe(false);
  });

  it('should close update comment modal correctly', () => {
    // Arrange
    const { result } = renderHook(() => usePostDetails());

    // Act
    act(() => {
      result.current.closeUpdateCommentModal();
    });

    // Assert
    expect(result.current.isUpdateCommentModalOpen).toBe(false);
  });

  it('should successfully delete a comment on handleDeleteComment', async () => {
    // Arrange
    const deleteCommentMock = vi.fn().mockResolvedValue({});
    const removePostCommentMock = vi.fn();

    (useMutation as unknown as Mock).mockImplementation(() => [deleteCommentMock, { loading: false }]);

    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: vi.fn(),
        updatePostComment: vi.fn(),
        removePostComment: removePostCommentMock,
        feedPostsList: [{ id: '1', content: 'Test Post' }],
        loggedUserId: 'user-1',
        commentsByPost: { '1': [] },
        setPostDetailsComments: vi.fn(),
      };
      return selector(state);
    });

    const { result } = renderHook(() => usePostDetails());

    act(() => {
      result.current.openDeleteCommentModal('comment-123');
    });

    expect(result.current.isDeleteCommentModalOpen).toBe(true);

    // Act
    await act(async () => {
      await result.current.handleDeleteComment();
    });

    // Assert
    expect(deleteCommentMock).toHaveBeenCalledWith({
      variables: {
        commentId: 'comment-123',
      },
    });
    expect(removePostCommentMock).toHaveBeenCalledWith('comment-123', '1');
    expect(toast.success).toHaveBeenCalledWith('Comentário excluído com sucesso!');
    expect(result.current.isDeleteCommentModalOpen).toBe(false);
  });

  it('should successfully add a comment on handleAddComment', async () => {
    // Arrange
    const createCommentMock = vi.fn().mockResolvedValue({
      data: {
        createComment: {
          id: 'new-comment-id',
          content: 'new comment content',
          author: {
            id: 'author-1',
            name: 'Author Name',
          },
        },
      },
    });
    const addPostCommentMock = vi.fn();

    (useMutation as unknown as Mock).mockImplementation(() => [createCommentMock, { loading: false }]);

    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: addPostCommentMock,
        updatePostComment: vi.fn(),
        removePostComment: vi.fn(),
        feedPostsList: [{ id: '1', content: 'Test Post' }],
        loggedUserId: 'user-1',
        commentsByPost: { '1': [] },
        setPostDetailsComments: vi.fn(),
      };
      return selector(state);
    });

    const { result } = renderHook(() => usePostDetails());

    if (result.current.newCommentRef.current) {
      result.current.newCommentRef.current.value = 'new comment content';
    } else {
      result.current.newCommentRef.current = { value: 'new comment content' } as any;
    }

    const event = { preventDefault: vi.fn() } as any;

    // Act
    await act(async () => {
      await result.current.handleAddComment(event);
    });

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(createCommentMock).toHaveBeenCalledWith({
      variables: {
        postId: '1',
        content: 'new comment content',
      },
    });
    expect(addPostCommentMock).toHaveBeenCalledWith({
      id: 'new-comment-id',
      content: 'new comment content',
      postId: '1',
      author: {
        id: 'author-1',
        name: 'Author Name',
      },
    });
    expect(result.current.newCommentRef.current.value).toBe('');
    expect(toast.success).toHaveBeenCalledWith('Comentário adicionado com sucesso!');
  });

  it('should handle error when deleting a comment fails', async () => {
    // Arrange
    const deleteCommentMock = vi.fn().mockRejectedValue(new Error('Network error'));

    (useMutation as unknown as Mock).mockImplementation((mutation) => {
      if (mutation === DELETE_COMMENT) {
        return [deleteCommentMock, { loading: false }];
      }
      return [vi.fn(), { loading: false }];
    });

    const { result } = renderHook(() => usePostDetails());

    act(() => {
      result.current.openDeleteCommentModal('comment-123');
    });

    // Act
    await act(async () => {
      await result.current.handleDeleteComment();
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith('Erro ao excluir comentário. Tente novemente');
    expect(result.current.isDeleteCommentModalOpen).toBe(false);
  });

  it('should return early in handleAddComment if newCommentValue is empty', async () => {
    // Arrange
    const createCommentMock = vi.fn();
    (useMutation as unknown as Mock).mockImplementation((mutation) => {
      if (mutation === CREATE_COMMENT) return [createCommentMock, { loading: false }];
      return [vi.fn(), { loading: false }];
    });

    const { result } = renderHook(() => usePostDetails());

    if (result.current.newCommentRef.current) {
      result.current.newCommentRef.current.value = '';
    } else {
      result.current.newCommentRef.current = { value: '' } as any;
    }

    const event = { preventDefault: vi.fn() } as any;

    // Act
    await act(async () => {
      await result.current.handleAddComment(event);
    });

    // Assert
    expect(createCommentMock).not.toHaveBeenCalled();
  });

  it('should handle error when adding a comment fails', async () => {
    // Arrange
    const createCommentMock = vi.fn().mockRejectedValue(new Error('error'));
    (useMutation as unknown as Mock).mockImplementation((mutation) => {
      if (mutation === CREATE_COMMENT) return [createCommentMock, { loading: false }];
      return [vi.fn(), { loading: false }];
    });

    const { result } = renderHook(() => usePostDetails());

    if (result.current.newCommentRef.current) {
      result.current.newCommentRef.current.value = 'comment';
    } else {
      result.current.newCommentRef.current = { value: 'comment' } as any;
    }

    const event = { preventDefault: vi.fn() } as any;

    // Act
    await act(async () => {
      await result.current.handleAddComment(event);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith('Erro ao adicionar comentário. Tente novamente');
  });

  it('should successfully update a comment and update the store', async () => {
    // Arrange
    const updateCommentMock = vi.fn().mockResolvedValue({});
    const updatePostCommentMock = vi.fn();

    (useMutation as unknown as Mock).mockImplementation(() => [updateCommentMock, { loading: false }]);

    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: vi.fn(),
        updatePostComment: updatePostCommentMock,
        removePostComment: vi.fn(),
        feedPostsList: [{ id: '1', content: 'Test Post' }],
        loggedUserId: 'user-1',
        commentsByPost: { '1': [] },
        setPostDetailsComments: vi.fn(),
      };
      return selector(state);
    });

    const { result } = renderHook(() => usePostDetails());

    act(() => {
      result.current.openUpdateCommentModal('comment-id', 'old');
    });

    if (result.current.updatedCommentRef.current) {
      result.current.updatedCommentRef.current.value = 'updated string';
    } else {
      result.current.updatedCommentRef.current = { value: 'updated string' } as any;
    }

    const event = { preventDefault: vi.fn() } as any;

    // Act
    await act(async () => {
      await result.current.handleUpdateComment(event);
    });

    // Assert
    expect(updateCommentMock).toHaveBeenCalledWith({
      variables: {
        commentId: 'comment-id',
        newContent: 'updated string',
      },
    });
    expect(updatePostCommentMock).toHaveBeenCalledWith('comment-id', 'updated string', '1');
    expect(toast.success).toHaveBeenCalledWith('Comentário atualizado com sucesso!');
    expect(result.current.isUpdateCommentModalOpen).toBe(false);
  });

  it('should handle error when updating a comment fails', async () => {
    // Arrange
    const updateCommentMock = vi.fn().mockRejectedValue({});
    (useMutation as unknown as Mock).mockImplementation(() => [updateCommentMock, { loading: false }]);

    const { result } = renderHook(() => usePostDetails());

    act(() => {
      result.current.openUpdateCommentModal('comment-id', 'old');
    });

    if (result.current.updatedCommentRef.current) {
      result.current.updatedCommentRef.current.value = 'updated string';
    } else {
      result.current.updatedCommentRef.current = { value: 'updated string' } as any;
    }

    const event = { preventDefault: vi.fn() } as any;

    // Act
    await act(async () => {
      await result.current.handleUpdateComment(event);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar comentário. Tente novamente');
  });

  it('should fetch comments on mount and call setPostDetailsComments', async () => {
    // Arrange
    const getAllCommentsMock = vi.fn().mockResolvedValue({
      data: {
        getAllCommentsByPostId: [{ id: 'c1', content: 'test comment' }],
      },
    });

    (useLazyQuery as unknown as Mock).mockImplementation(() => [getAllCommentsMock, { loading: false }]);

    const setPostDetailsCommentsMock = vi.fn();

    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: vi.fn(),
        updatePostComment: vi.fn(),
        removePostComment: vi.fn(),
        feedPostsList: [{ id: '1', content: 'Test Post' }],
        loggedUserId: 'user-1',
        commentsByPost: { '1': [] },
        setPostDetailsComments: setPostDetailsCommentsMock,
      };
      return selector(state);
    });

    // Act
    renderHook(() => usePostDetails());

    // Assert
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(getAllCommentsMock).toHaveBeenCalledWith({
      variables: { postId: '1' },
    });
    expect(setPostDetailsCommentsMock).toHaveBeenCalledWith('1', [{ id: 'c1', content: 'test comment' }]);
  });

  it('should handle error when fetching comments fails', async () => {
    // Arrange
    const getAllCommentsMock = vi.fn().mockRejectedValue(new Error('error'));
    (useLazyQuery as unknown as Mock).mockImplementation(() => [getAllCommentsMock, { loading: false }]);

    // Act
    renderHook(() => usePostDetails());

    // Assert
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(getAllCommentsMock).toHaveBeenCalled();
  });

  it('should update the apollo cache to decrement commentsCount when deleteComment is called', () => {
    // Arrange
    renderHook(() => usePostDetails());

    const deleteCommentCall = (useMutation as unknown as Mock).mock.calls.find(
      (call) => call[0] === DELETE_COMMENT
    );

    const options = deleteCommentCall[1];

    const cacheMock = {
      identify: vi.fn().mockReturnValue('Post:1'),
      modify: vi.fn(),
    };

    // Act
    options.update(cacheMock);

    // Assert
    expect(cacheMock.modify).toHaveBeenCalledWith({
      id: 'Post:1',
      fields: {
        commentsCount: expect.any(Function),
      },
    });

    const modifyArgs = cacheMock.modify.mock.calls[0][0];
    const newCount = modifyArgs.fields.commentsCount(5);
    expect(newCount).toBe(4);

    const newCountFallback = modifyArgs.fields.commentsCount(undefined);
    expect(newCountFallback).toBe(-1); 
  });

  it('should not throw and skip store updates if postId is null', async () => {
    // Arrange
    (useSearchParams as Mock).mockImplementation(() => [{ get: vi.fn().mockReturnValue(null) }]);
    
    const updateCommentMock = vi.fn().mockResolvedValue({});
    const createCommentMock = vi.fn().mockResolvedValue({
      data: {
        createComment: {
          id: 'new-comment-id',
          content: 'new comment',
          author: { id: 'au', name: 'au name' },
        },
      },
    });
    const deleteCommentMock = vi.fn().mockResolvedValue({});

    (useMutation as unknown as Mock).mockImplementation((mutation) => {
      if (mutation === CREATE_COMMENT) return [createCommentMock, { loading: false }];
      if (mutation === DELETE_COMMENT) return [deleteCommentMock, { loading: false }];
      return [updateCommentMock, { loading: false }];
    });

    const updatePostCommentMock = vi.fn();
    const addPostCommentMock = vi.fn();
    const removePostCommentMock = vi.fn();

    (useStore as unknown as Mock).mockImplementation((selector) => {
      const state = {
        addPostComment: addPostCommentMock,
        updatePostComment: updatePostCommentMock,
        removePostComment: removePostCommentMock,
        feedPostsList: [{ id: '1', content: 'Test Post' }],
        loggedUserId: 'user-1',
        commentsByPost: { '1': [] },
        setPostDetailsComments: vi.fn(),
      };
      return selector(state);
    });

    const { result } = renderHook(() => usePostDetails());

    // act update
    if (result.current.updatedCommentRef.current) {
      result.current.updatedCommentRef.current.value = 'updated string';
    } else {
      result.current.updatedCommentRef.current = { value: 'updated string' } as any;
    }
    
    // act add
    if (result.current.newCommentRef.current) {
      result.current.newCommentRef.current.value = 'new entry';
    } else {
      result.current.newCommentRef.current = { value: 'new entry' } as any;
    }
    const event = { preventDefault: vi.fn() } as any;

    await act(async () => {
      await result.current.handleUpdateComment(event);
      await result.current.handleAddComment(event);
      await result.current.handleDeleteComment();
    });

    expect(updatePostCommentMock).not.toHaveBeenCalled();
    expect(addPostCommentMock).not.toHaveBeenCalled();
    expect(removePostCommentMock).not.toHaveBeenCalled();

    // Restore the mock for other tests
    (useSearchParams as Mock).mockImplementation(() => [{ get: vi.fn().mockReturnValue('1') }]);
  });
});
