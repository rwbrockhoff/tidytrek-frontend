import reducer, { getAuthStatus, initialState } from './userSlice';

describe('User Slice', () => {
  it('Should return initial state', () => {
    expect(reducer(initialState, { type: 'noop' })).toEqual(initialState);
  });
  it('Should do something', () => {
    const result = getAuthStatus();
    expect(result).toBeDefined();
  });
});
