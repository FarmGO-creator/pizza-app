import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import Header from "../../../components/Header/Header";
import Dishes from "../Dishes/Dishes";
import {Container} from "@mui/material";
import CreateDish from "../CreateDish/CreateDish";
import EditDish from "../EditDish/EditDish";
import Orders from "../Orders/Orders";

const MyAdmin = () => {
  return (
    <div className='wrapper'>
      <Header name='Admin'>
        <NavLink className='link' to='admin-dishes/'>Dishes</NavLink>
        <NavLink className='link' to='orders/'>Orders</NavLink>
      </Header>
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Dishes/>}/>
            <Route path='admin-dishes' element={<Dishes/>}/>
            <Route path='create-dish' element={<CreateDish/>}/>
            <Route path='admin-dishes/create-dish' element={<CreateDish/>}/>
            <Route path='admin-dishes/edit-dish/:id' element={<EditDish/>}/>
            <Route path='edit-dish/:id' element={<EditDish/>}/>
            <Route path='orders' element={<Orders/>}/>
          </Routes>
        </Container>
      </main>
    </div>
  );
};

export default MyAdmin;