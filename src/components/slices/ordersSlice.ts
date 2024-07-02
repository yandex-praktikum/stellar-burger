import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderNumber = createAsyncThunk(
  'order/getOrderByNumberApi',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderBurger = createAsyncThunk(
  'order/orderBurgerApi',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('order/getOrdersApi', getOrdersApi);

export interface TOrderSlice {
  order: TOrder | null;
  orderId: TOrder[];
  userOrders: TOrder[];
  isLoading: boolean;
  orderRequest: boolean;
  orderData: TOrder | null;
}

export const initialState: TOrderSlice = {
  order: null,
  orderId: [],
  userOrders: [],
  isLoading: false,
  orderRequest: false,
  orderData: null
};

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearData: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderId: (state) => state.orderId,
    getUserOrders: (state) => state.userOrders,
    getIsLoading: (state) => state.isLoading,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = false;
      })
      .addCase(getOrderNumber.rejected, (state) => {
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(getOrderNumber.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderId = payload.orders;
      })
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.order = payload.order;
        state.orderData = state.order;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userOrders = payload;
      });
  }
});

export const { clearData } = ordersSlice.actions;
export const {
  getOrderRequest,
  getOrderModalData,
  getIsLoading,
  getOrder,
  getOrderId,
  getUserOrders
} = ordersSlice.selectors;
export const order = ordersSlice.reducer;
