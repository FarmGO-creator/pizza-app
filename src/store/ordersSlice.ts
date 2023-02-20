import {createSlice} from "@reduxjs/toolkit";
import {fetchOrders, removeOrders} from "./dishesThunk";
import {RootState} from "../app/store";
import {OrderAdminList} from "../types";

interface InitialStateType {
  orders: OrderAdminList[]
  loading: boolean;
  removeOrdersLoader: false | string;
}

const initialState:InitialStateType = {
  orders: [],
  loading: false,
  removeOrdersLoader: false
};

const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: order}) => {
      state.loading = false;
      state.orders = order;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeOrders.pending, (state, {meta: {arg: id}}) => {
      state.removeOrdersLoader = id
    });
    builder.addCase(removeOrders.fulfilled, (state) => {
      state.removeOrdersLoader = false
    });
    builder.addCase(removeOrders.rejected, (state) => {
      state.removeOrdersLoader = false
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const selectFetchOrders = (state:RootState) => state.order.orders;
export const selectOrdersLoading = (state:RootState) => state.order.loading;
export const selectOrderRemoveLoading = (state:RootState) => state.order.removeOrdersLoader;