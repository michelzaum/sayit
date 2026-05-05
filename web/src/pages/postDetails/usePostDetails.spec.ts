import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMutation } from '@apollo/client/react';
import { usePostDetails } from './usePostDetails';
import { useStore } from '../../store/store';
import { CREATE_COMMENT } from './mutations/createComment';

vi.mock('react-router', () => ({
  useSearchParams: () => [{ get: vi.fn().mockReturnValue('1') }],
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
});
