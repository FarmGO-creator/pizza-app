import React, {useEffect} from 'react';
import {Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectEditDishesLoader, selectOneDish} from "../../../store/dishesSlice";
import {editDishes, fetchOneDish} from "../../../store/dishesThunk";
import {useNavigate, useParams} from "react-router-dom";
import {ApiDish} from "../../../types";
import Form from "../../../components/Form/Form";

const EditDish = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editDishLoader = useAppSelector(selectEditDishesLoader);
  const oneDish = useAppSelector(selectOneDish);

  const onSubmit = async (dish:ApiDish) => {
    await dispatch(editDishes({id, dish}));
    navigate('/admin');
  }

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id])

  const oneDishForm = oneDish &&  {
    ...oneDish,
    price: oneDish.price.toString()
  }

  return (
    <>
      <h2 style={{textAlign: 'center'}}>Редактирование блюда</h2>
      <Paper elevation={3} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2}}>
        {
          oneDishForm && (
            <Form
              onSubmit={onSubmit}
              isLoader={editDishLoader}
              oneDish={oneDishForm}
              isEdit
            />
          )
        }
      </Paper>
    </>
  );
};

export default EditDish;