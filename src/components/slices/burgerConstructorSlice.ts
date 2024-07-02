import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TIngredient | null;
  constructorIngredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  constructorIngredients: []
};

export const ConstructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (ingredients) => ingredients.id !== action.payload._id
      );
    },
    clearIngredient: (state) => {
      state.bun = null;
      state.constructorIngredients = [];
    }
  },
  selectors: {
    getIngredients: (state) => state.constructorIngredients,
    getBun: (state) => state.bun
  }
});

export const { getBun, getIngredients } = ConstructorBurgerSlice.selectors;
export const { addBun, addIngredient, removeIngredient, clearIngredient } =
  ConstructorBurgerSlice.actions;
export const constructorBurger = ConstructorBurgerSlice.reducer;
