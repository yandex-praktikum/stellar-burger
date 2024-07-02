import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const feedApi = createAsyncThunk(
  'getFeedOrdersApi/getFeedsApi',
  getFeedsApi
);

type FeedState = {
  feed: TOrdersData;
  isLoading: boolean;
};

export const initialState: FeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.feed,
    getIsloading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(feedApi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(feedApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.feed = payload;
      });
  }
});

export const { getFeed, getIsloading } = feedSlice.selectors;
export const feed = feedSlice.reducer;
