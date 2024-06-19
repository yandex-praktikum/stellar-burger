import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from '../thunks/orderThunks';
import { getOrders } from '../thunks/ordersThunks';

interface TOrdersState {
  orders: TOrder[];
}

const initialState: TOrdersState = {
  orders: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    }
  },
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orders.push(action.payload);
        }
      )
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const ordersActions = ordersSlice.actions;
export const ordersSelectors = ordersSlice.selectors;

export default ordersSlice.reducer;
