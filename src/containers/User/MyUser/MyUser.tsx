import React from 'react';
import Header from "../../../components/Header/Header";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import DishesUser from "../DishesUser/DishesUser";

const MyUser = () => {
  return (
    <>
      <Header name='Turtle Pizza'/>
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<DishesUser/>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default MyUser;