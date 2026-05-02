import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePostDetails } from './usePostDetails';

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

vi.mock('@/store/store', () => ({
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
});