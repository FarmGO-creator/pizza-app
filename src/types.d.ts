export interface Dishes {
  id: string;
  title: string;
  content: string;
  price: number;
  image: string;
}

export interface DishesForm {
  title: string;
  price: string;
  content: string;
  image: string;
}

export type ApiDish = Omit<Dishes, 'id'>

export interface DishList {
  [id: string]:ApiDish
}

export interface CartDishes {
  id: string;
  dish: Dishes;
  amount: number;
}

export interface Orders {
  [id: string]: number;
}

export interface OrdersList {
  [id: string]:Orders
}

export interface OrderAdmin {
  dish: Dishes | undefined,
  total: number,
}

export interface OrderAdminList {
  id: string;
  order: OrderAdmin[]
}