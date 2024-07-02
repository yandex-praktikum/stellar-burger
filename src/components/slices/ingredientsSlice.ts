import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredientsApi',
  getIngredientsApi
);

export interface TIngredientsSlice {
  ingredientData: TIngredient[];
  isLoading: boolean;
}

export const initialState: TIngredientsSlice = {
  ingredientData: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientData: (state) => state.ingredientData,
    getIsloading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ingredientData = payload;
      });
  }
});

export const { getIngredientData, getIsloading } = ingredientsSlice.selectors;
export const ingredients = ingredientsSlice.reducer;
