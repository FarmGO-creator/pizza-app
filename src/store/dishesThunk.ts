import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiDish, Dishes, DishList, Orders, OrderAdminList, OrdersList} from "../types";
import {AppDispatch, RootState} from "../app/store";

export const fetchDishes = createAsyncThunk(
  'dishes/fetch',
  async () => {
    const response = await axiosApi.get<DishList | null>('/dishes2.json');
    const dishes = response.data;

    let newDishes:Dishes[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map((id) => {
        return {
          ...dishes[id],
          id
        }
      })
    }

    return newDishes
  }
);

export const createDishes = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (dish) => {
    await axiosApi.post('/dishes2.json', dish)
  }
);

export const removeDishes = createAsyncThunk<void, string>(
  'dishes/remove',
  async (id) => {
    await axiosApi.delete('/dishes2/' + id + '.json');
    await axiosApi.delete('/orders2/' + id + '.json');
  }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'oneDish/fetch',
  async (id) => {
    const response = await axiosApi.get<ApiDish | null>('/dishes2/' + id + '.json');
    const oneDish = response.data;

    if (oneDish === null) {
      throw new Error('Not found');
    }

    return oneDish
  }
);

interface EditDishesType {
  id: string;
  dish: ApiDish | null;
}


export const editDishes = createAsyncThunk<void, EditDishesType>(
  'dishes/edit',
  async (dish) => {
    await axiosApi.put('/dishes2/' + dish.id + '.json', dish.dish);
  }
);

interface OrderCart {
  [id: string]:number
}

export const createOrders = createAsyncThunk<void, OrderCart>(
  'order/post',
  async (arg) => {
    await axiosApi.post('/orders2.json', arg)
  }
);

export const fetchOrders = createAsyncThunk<OrderAdminList[], undefined, {dispatch: AppDispatch, state: RootState}>(
  'order/fetch',
  async (_, thunkAPI) => {
    const responseOrders = await axiosApi.get<OrdersList | null>('/orders2.json');
    const orders = responseOrders.data;
    await thunkAPI.dispatch(fetchDishes());

    let newOrders:Orders[] = [];
    let dishes = thunkAPI.getState().dishes.dish;


    if (orders) {
      newOrders = Object.keys(orders).map((id) => {
        return {
          ...orders[id]
        }
      })
    }

    const newOrders2:OrderAdminList[] = [];

    newOrders.forEach((item1, index) => {
      const dish = Object.keys(item1).map((item, index) => {
        return {
          dish: dishes.find((id) => id.id === item),
          total: Object.values(item1)[index]
        }
      });

      if (dish.length === 0) {
        return;
      }

      const obj:OrderAdminList = {
        id: Object.getOwnPropertyNames(orders)[index],
        order: dish
      }

      newOrders2.push(obj);

    });

    return newOrders2

  }
);

export const removeOrders = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
  'order/remove',
  async (id, thunkAPI) => {
    await axiosApi.delete('/orders2/' + id + '.json');
    await thunkAPI.dispatch(fetchOrders());
  }
)