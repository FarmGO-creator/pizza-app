import React, {useEffect} from 'react';
import Dish from "../../../components/Dish/Dish";
import {Box, IconButton, LinearProgress, Paper, Alert, Grid} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDishes, selectDishesLoader} from "../../../store/dishesSlice";
import {fetchDishes, removeDishes} from "../../../store/dishesThunk";

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoader = useAppSelector(selectDishesLoader);

  console.log(dishes)

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id:string) => {
    await dispatch(removeDishes(id));
    await dispatch(fetchDishes());
  }

  return (
    <div>
      <Box component='div' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{textAlign: 'center'}}>Dishes</h1>
        <NavLink to='create-dish/'>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddCircleIcon />
          </IconButton>
        </NavLink>
      </Box>
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
                  <Dish key={dish.id} dishes={dish} removeDishes={() => removeDish(dish.id)}/>
                ))
              ) : <Alert severity="info">Добавьте блюдо !</Alert>
            ) : <LinearProgress/>
          }
        </Grid>
      </Paper>
    </div>
  );
};

export default Dishes;