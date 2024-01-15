import { createSlice } from '@reduxjs/toolkit';

interface User {
  userId: string;
  name: string;
  email: string;
}
interface InitialState {
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: boolean;
  authErrorMessage: string;
  user: User;
}
export const initialState: InitialState = {
  isAuthenticated: false,
  authLoading: false,
  authError: false,
  authErrorMessage: '',
  user: { userId: '', name: '', email: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;
export default userSlice.reducer;
