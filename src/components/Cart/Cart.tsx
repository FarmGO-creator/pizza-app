import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {removeCart, selectCartDish} from "../../store/cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {orders} from "../../listOrders";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartDish);

  const removeToCart = (idCart: string, idOrder:string) => {
    dispatch(removeCart(idCart));
    delete orders[idOrder]
  };

  return (
    <>
      {cart.map(item => (
        <Paper
          key={item.dish.id}
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100px',
            mb: 2
          }}
        >
          <Box component='div' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton aria-label="delete" onClick={() => removeToCart(item.id, item.dish.id)}>
              <DeleteIcon />
            </IconButton>

            <Typography sx={{ fontSize: '20px', mr: 2}} color="text.secondary" gutterBottom>
              {item.amount}x
            </Typography>
          </Box>

          <img
            src={item.dish.image}
            width='200px'
            height='auto'
            alt=""
            style={{margin: '0 auto'}}
          />
          <Typography sx={{ fontSize: 20, textAlign: 'center' }} color="text.secondary" gutterBottom>
            {item.dish.title}
          </Typography>
        </Paper>
      ))}
    </>
  );
};

export default Cart;