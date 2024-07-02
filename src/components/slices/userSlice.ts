import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TLoginData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const getUserThunk = createAsyncThunk('user/getUserApi', getUserApi);

export const registUser = createAsyncThunk(
  'user/registerUserApi',
  registerUserApi
);

export const loginUser = createAsyncThunk(
  'user/loginUserApi',
  async (data: TLoginData) => {
    const log = await loginUserApi(data);
    setCookie('accessToken', log.accessToken);
    localStorage.setItem('refreshToken', log.refreshToken);
    return log;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUserApi',
  async function () {
    logoutApi().then(() => {
      localStorage.clear();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    });
  }
);

export const updateUser = createAsyncThunk('user/updateUserApi', updateUserApi);

export const resetPassword = createAsyncThunk(
  'user/resetPasswordApi',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPasswordApi',
  async (email: string) => {
    await forgotPasswordApi({ email });
  }
);

export interface UserState {
  isAuth: boolean;
  user: TUser | null;
}

export const initialState: UserState = {
  isAuth: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = { name: '', email: '' };
      state.isAuth = false;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
      })

      .addCase(registUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(registUser.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(registUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuth = false;
      });
  }
});

export const { logOutUser } = userSlice.actions;
export const { getUser, getIsAuth } = userSlice.selectors;
export const user = userSlice.reducer;
