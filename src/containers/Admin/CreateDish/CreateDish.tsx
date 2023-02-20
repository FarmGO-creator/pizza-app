import React from 'react';
import {Paper} from "@mui/material";
import Form from "../../../components/Form/Form";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCreateDishesLoader} from "../../../store/dishesSlice";
import {ApiDish} from "../../../types";
import {createDishes} from "../../../store/dishesThunk";
import {useNavigate} from "react-router-dom";

const CreateDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loaderCreateDishes = useAppSelector(selectCreateDishesLoader);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(createDishes(dish));
    navigate('/admin')
  }

  return (
    <>
      <h2 style={{textAlign: 'center'}}>Создание блюда</h2>
      <Paper elevation={3} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2}}>
        <Form isLoader={loaderCreateDishes} onSubmit={onSubmit}/>
      </Paper>
    </>
  );
};

export default CreateDish;