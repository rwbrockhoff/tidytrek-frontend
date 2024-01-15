import { wrapper } from '../../tests/test-utils';
import { useGetAuthStatusQuery } from './userApiSlice';
import { renderHook, waitFor } from '@testing-library/react';

describe('User API Slice: ', () => {
  it('Should render getAuthStatus', async () => {
    const { result } = await renderHook(() => useGetAuthStatusQuery(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
