import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartDishes, Dishes} from "../types";
import {RootState} from "../app/store";
import {createOrders} from "./dishesThunk";

interface InitialStateType {
  cartDishes: CartDishes[];
  loading: boolean;
}

const initialState:InitialStateType = {
  cartDishes: [],
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, {payload: dish}:PayloadAction<Dishes>) => {
      const add = state.cartDishes.findIndex(item => item.dish.id === dish.id);
      if (add !== -1) {
        state.cartDishes[add].amount++
      } else {
        state.cartDishes.push({dish, amount: 1, id: Date.now().toString()})
      }
    },
    removeCart: (state, {payload: id}:PayloadAction<string>) => {
      const cartId = state.cartDishes.findIndex(item => item.id === id);
      state.cartDishes.splice(cartId, 1);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrders.pending, state => {
      state.loading = true;
    });
    builder.addCase(createOrders.fulfilled, state => {
      state.loading = false;
      state.cartDishes = [];
    });
    builder.addCase(createOrders.rejected, state => {
      state.loading = false;
    });
  }
});

export const cartReducer = cartSlice.reducer;
export const {addCart, removeCart} = cartSlice.actions;
export const selectCartDish = (state: RootState) => state.cart.cartDishes;