import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './../thunks/userThunks';
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  loginUserRequest: boolean;
  isLoading: boolean;
}

const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  loginUserRequest: false,
  isLoading: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userInit: (state) => {
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.userData = null;
    }
  },
  selectors: {
    selectUserData: (state) => state.userData,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.isLoading = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
        state.isLoading = true;
      });
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
