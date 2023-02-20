import React, {useEffect, useState} from 'react';
import {Alert, Button, Grid, LinearProgress, Paper} from "@mui/material";
import DishUser from "../../../components/DishUser/DishUser";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDishes, selectDishesLoader} from "../../../store/dishesSlice";
import {fetchDishes} from "../../../store/dishesThunk";
import {selectCartDish} from "../../../store/cartSlice";
import ListOrders from "../../../components/ListOrders/ListOrders";


const DishesUser:React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoader = useAppSelector(selectDishesLoader);
  const cart = useAppSelector(selectCartDish);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const total = cart.reduce((acc, num) => {
    return acc + num.amount * num.dish.price
  }, 0);

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Dishes</h1>
      <Button onClick={() => setOpenModal(true)} variant="outlined">Checkout {total} kgs</Button>
      <Paper
        component='div'
        elevation={3}
        sx={{
          height: '70vh',
          overflowY: 'scroll',
          p: 2,
          '&::-webkit-scrollbar': {width: 0}
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            !dishesLoader ? (
              dishes.length !== 0 ? (
                dishes.map(dish => (
                  <DishUser key={dish.id} dish={dish}/>
                ))
              ) : <Alert severity="info">Добавьте блюдо !</Alert>
            ) : <LinearProgress/>
          }
        </Grid>
      </Paper>
      <ListOrders total={total} modal={openModal} open={() => setOpenModal(true)} close={() => setOpenModal(false)}/>
    </div>
  );
};

export default DishesUser;