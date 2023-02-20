import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Dishes} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectRemoveDishesLoader} from "../../store/dishesSlice";

interface Props {
  dishes: Dishes;
  removeDishes: React.MouseEventHandler;
}

const Dish:React.FC<Props> = ({dishes, removeDishes}) => {
  const loaderRemoveDishes = useAppSelector(selectRemoveDishesLoader);

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card elevation={4} sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', mb: 5}}>
          <img src={dishes.image} width='200px' height='auto' alt=""/>
          <CardContent sx={{mr: 'auto'}}>
            <Typography gutterBottom variant="h5" component="div">
              {dishes.title}
            </Typography>
            <Typography variant="body2">
              {dishes.content}
            </Typography>
            <Chip
              color="success"
              variant="outlined"
              label={dishes.price + 'kg'}
              sx={{position: 'absolute', right: 10, top: 10}}
            />
          </CardContent>
          <CardActions>
            <ButtonGroup orientation='horizontal' aria-label="small button group">
              <Link className='link' to={'edit-dish/' + dishes.id}>
                <Button variant="outlined" startIcon={<EditIcon />} sx={{width: '100%'}}>
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                startIcon={loaderRemoveDishes === dishes.id ? <CircularProgress size={15}/> : <DeleteIcon/>}
                onClick={removeDishes}
                disabled={loaderRemoveDishes ? loaderRemoveDishes === dishes.id : false}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Dish;