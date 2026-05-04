import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { usePostDetails } from './usePostDetails';
import { useStore } from '../../store/store';

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
    const { result } = renderHook(() => usePostDetails());

    act(() => {
      result.current.openUpdateCommentModal('comment-123', 'Old comment content');
    });

    expect(result.current.isUpdateCommentModalOpen).toBe(true);
    expect(result.current.updatedCommentContent).toBe('Old comment content');
  });
});