import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {Dishes} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {addCart} from "../../store/cartSlice";

interface Props {
  dish: Dishes;
}

const DishUser:React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addCart(dish));
  }

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card
          onClick={addToCart}
          elevation={4}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 5,
            cursor: 'pointer'
          }}
        >
          <img src={dish.image} width='200px' height='auto' alt=""/>
          <CardContent sx={{mr: 'auto'}}>
            <Typography gutterBottom variant="h5" component="div">
              {dish.title}
            </Typography>
            <Typography variant="body2">
              {dish.content}
            </Typography>
          </CardContent>
          <Typography sx={{mr: 5}} gutterBottom variant="h5" component="div">
            {dish.price} KGS
          </Typography>
        </Card>
      </Grid>
    </>
  );
};

export default DishUser;