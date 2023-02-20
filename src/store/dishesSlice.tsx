import {createSlice} from "@reduxjs/toolkit";
import {ApiDish, Dishes} from "../types";
import {createDishes, editDishes, fetchDishes, fetchOneDish, removeDishes} from "./dishesThunk";
import {RootState} from "../app/store";

interface InitialStateType {
  dish: Dishes[];
  dishesLoader: boolean;
  createDishesLoader: boolean;
  removeDishesLoader: false | string;
  editDishesLoader: boolean;
  oneDish: ApiDish | null;
  oneDishLoader: boolean;
}

const initialState:InitialStateType = {
  dish: [],
  dishesLoader: false,
  createDishesLoader: false,
  removeDishesLoader: false,
  editDishesLoader: false,
  oneDish: null,
  oneDishLoader: false,
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.dishesLoader = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.dishesLoader = false;
      state.dish = dishes;
      state.oneDish = null
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.dishesLoader = false;
    });

    builder.addCase(createDishes.pending, (state) => {
      state.createDishesLoader = true;
    });
    builder.addCase(createDishes.fulfilled, (state) => {
      state.createDishesLoader = false;
    });
    builder.addCase(createDishes.rejected, (state) => {
      state.createDishesLoader = false;
    });

    builder.addCase(removeDishes.pending, (state, {meta: {arg: id}}) => {
      state.removeDishesLoader = id;
    });
    builder.addCase(removeDishes.fulfilled, (state) => {
      state.removeDishesLoader = false;
    });
    builder.addCase(removeDishes.rejected, (state) => {
      state.removeDishesLoader = false;
    });

    builder.addCase(fetchOneDish.pending, (state) => {
      state.oneDishLoader = true
    });
    builder.addCase(fetchOneDish.fulfilled, (state, {payload: dish}) => {
      state.oneDishLoader = false;
      state.oneDish = dish
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.oneDishLoader = false;
    });

    builder.addCase(editDishes.pending, (state) => {
      state.editDishesLoader = true
    });
    builder.addCase(editDishes.fulfilled, (state) => {
      state.editDishesLoader = false;
    });
    builder.addCase(editDishes.rejected, (state) => {
      state.editDishesLoader = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.dish;
export const selectDishesLoader = (state: RootState) => state.dishes.dishesLoader;
export const selectCreateDishesLoader = (state: RootState) => state.dishes.createDishesLoader;
export const selectRemoveDishesLoader = (state: RootState) => state.dishes.removeDishesLoader;
export const selectEditDishesLoader = (state: RootState) => state.dishes.editDishesLoader;
export const selectOneDishLoader = (state: RootState) => state.dishes.oneDishLoader;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;