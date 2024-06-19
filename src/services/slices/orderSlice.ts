import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from '../thunks/orderThunks';

interface TOrderState {
  orderData: TOrder | null;
  isOrderRequest: boolean;
  isReady: boolean;
  isLoading: boolean;
}

const initialState: TOrderState = {
  orderData: null,
  isOrderRequest: false,
  isReady: false,
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
    selectOrderData: (state) => state.orderData
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
      });
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice.reducer;
