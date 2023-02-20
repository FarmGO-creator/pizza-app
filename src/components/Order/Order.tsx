import React from 'react';
import {
  Box,
  Typography
} from "@mui/material";
import {OrderAdmin} from "../../types";

interface Props {
  order: OrderAdmin
}

const Order:React.FC<Props> = ({order}) => {
  return (
    <>
      <Box component='div' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: 'flex'}}>
          <span style={{display: 'block', marginRight: 5}}>x{order.total}</span>
          <Typography sx={{mb: 2}} color="text.secondary" component='p'>{order.dish?.title}</Typography>
          <Typography color="text.secondary" component='p' sx={{ml: 2}}>{order.dish?.price}KGS</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Order;