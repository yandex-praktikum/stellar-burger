import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});
