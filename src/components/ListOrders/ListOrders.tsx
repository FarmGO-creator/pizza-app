import React from 'react';
import {Alert, Box, Button, Paper, SwipeableDrawer, Typography} from "@mui/material";
import Cart from "../Cart/Cart";
import {DELIVERY} from "../../delivery";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCartDish} from "../../store/cartSlice";
import {orders} from "../../listOrders";
import {createOrders} from "../../store/dishesThunk";

interface Props {
  open: () => void;
  close: () => void;
  modal: boolean;
  total: number;
}

const ListOrders:React.FC<Props> = ({open, close, modal, total}) => {
  const dispatch = useAppDispatch();
  let cart = useAppSelector(selectCartDish);

  cart.forEach((item) => {
    orders[item.dish.id] = item.amount
  })

  const postOrders = async () => {
    await dispatch(createOrders(orders));
    close();
  }

  return (
    <>
      <SwipeableDrawer
        anchor='right'
        open={modal}
        onClose={close}
        onOpen={open}
      >
        {cart.length > 0 ? (
          <>
            <Paper elevation={1} component='div' sx={{width: 300, height: 700, p: 2, overflowY: 'scroll'}}>
              <Cart/>
            </Paper>

            <Box component='div' sx={{ml: 1, mt: 1}}>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Delivery: {DELIVERY} KGS
              </Typography>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Total: {total + DELIVERY}
              </Typography>

              <Button onClick={postOrders} sx={{width: '100%'}} variant="outlined">Outlined</Button>
            </Box>
          </>
        ) : <Alert sx={{width: '200px'}} severity="info">Корзина пуста !</Alert>}
      </SwipeableDrawer>
    </>
  );
};

export default ListOrders;