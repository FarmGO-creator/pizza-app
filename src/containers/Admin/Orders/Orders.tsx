import React, {useEffect} from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Paper,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchOrders, removeOrders} from "../../../store/dishesThunk";
import {selectFetchOrders, selectOrderRemoveLoading, selectOrdersLoading} from "../../../store/ordersSlice";
import Order from "../../../components/Order/Order";
import {DELIVERY} from "../../../delivery";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFetchOrders);
  const loading = useAppSelector(selectOrdersLoading);
  const btnLoading = useAppSelector(selectOrderRemoveLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <h1>Заказы: </h1>
      <Paper
        component='div'
        elevation={3}
        sx={{
          height: '70vh',
          overflowY: 'scroll',
          p: 2,
          mt: 5,
          '&::-webkit-scrollbar': {width: 0}
        }}
      >
        {
          orders.length > 0 ? (
            (!loading ? orders.map((item, index) => (
              <Card key={item.id} elevation={4}
                    sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5}}>
                <CardContent sx={{mr: 'auto'}}>
                  <Box component="div">
                    {
                      item.order.map((item2, index) => (
                        item2.dish ? (
                          <Order key={Math.floor(Math.random() * Date.now()).toString()} order={item2}/>
                        ) : index === 1 ? <span>Блюдо удаленно !</span> : null
                      ))
                    }
                  </Box>
                  <Typography color="text.secondary" component='p'>Доставка: {DELIVERY} </Typography>
                  <Typography color="text.secondary" component='div'> 123</Typography>
                </CardContent>
                <Button
                  disabled={btnLoading ? btnLoading === item.id : false}
                  onClick={() => dispatch(removeOrders(item.id))}
                  endIcon={btnLoading && btnLoading === item.id && <CircularProgress size={15}/>}
                >
                  remove
                </Button>
              </Card>
            )) : <LinearProgress/>)
          ) : <Alert severity="info">Список заказов пуст !</Alert>
        }
      </Paper>
    </>
  );
};

export default Orders;