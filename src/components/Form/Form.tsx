import React, {useState} from 'react';
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ApiDish, DishesForm} from "../../types";

interface Props {
  onSubmit: (dish: ApiDish) => void;
  isLoader: boolean;
  oneDish?: DishesForm;
  isEdit?: boolean;
}

const initialState:DishesForm = {
  title: '',
  price: '',
  content: '',
  image: '',
}

const Form:React.FC<Props> = (
  {
    onSubmit,
    isLoader,
    oneDish = initialState,
    isEdit = false
  }
) => {
  const [value, setValue] = useState<DishesForm>(oneDish);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]:value}));
  }

  const onSubmitForm = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...value,
      price: parseInt(value.price)
    });
    setValue({
      title: '',
      price: '',
      image: '',
      content: '',
    })
  }

  return (
    <Box component='form' width={700} onSubmit={onSubmitForm}>
      <TextField
        name='title'
        type='text'
        id="outlined-basic"
        label="Название блюда"
        variant="outlined"
        fullWidth sx={{mb: 2}}
        value={value.title}
        onChange={onChange}
        required
      />
      <TextField
        name='price'
        type='number'
        id="outlined-basic"
        label="Цена"
        variant="outlined"
        sx={{mb: 2}}
        value={value.price}
        onChange={onChange}
        required
      />
      <TextField
        name='content'
        type='text'
        label="content"
        variant="outlined"
        sx={{mb: 2}}
        value={value.content}
        onChange={onChange}
        fullWidth
        rows={4}
        multiline
        required
      />
      <TextField
        name='image'
        type='url'
        id="outlined-basic"
        label="Изображение"
        variant="outlined"
        fullWidth sx={{mb: 2}}
        value={value.image}
        onChange={onChange}
        required
      />

      <Button
        type='submit'
        variant="contained"
        disabled={isLoader}
        endIcon={!isLoader ?  <AddCircleIcon /> : <CircularProgress size={15} color='inherit'/>}
      >
        {isEdit ? 'edit' : 'create'}
      </Button>
    </Box>
  );
};

export default Form;