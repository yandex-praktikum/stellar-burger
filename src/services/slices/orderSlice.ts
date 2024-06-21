import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, orderBurger } from '../thunks/orderThunks';

interface IOrderState {
  orderData: TOrder | null;
  isOrderRequest: boolean;
  isReady: boolean;
  orderByNumber: TOrder | null;
  isLoading: boolean;
}

const initialState: IOrderState = {
  orderData: null,
  isOrderRequest: false,
  isReady: false,
  orderByNumber: null,
  isLoading: true
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModalOrder: (state) => {
      state.orderData = null;
      state.isOrderRequest = false;
    }
  },
  selectors: {
    selectIsOrderRequest: (state) => state.isOrderRequest,
    selectIsReady: (state) => state.isReady,
    selectOrderData: (state) => state.orderData,
    selectOrderByNumber: (state) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isOrderRequest = true;
        state.isReady = false;
        state.isLoading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isOrderRequest = false;
        state.isReady = false;
        state.isLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.isReady = true;
        state.orderData = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload[0];
      });
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice.reducer;
