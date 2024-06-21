import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { orderBurger } from '../thunks/orderThunks';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  burgerConstructoringredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  burgerConstructoringredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.burgerConstructoringredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    }
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectIngredients: (state) => state.burgerConstructoringredients
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.bun = null;
      state.burgerConstructoringredients = [];
    });
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorSelectors = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
