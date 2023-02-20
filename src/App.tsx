import React from 'react';
import MyAdmin from "./containers/Admin/MyAdmin/MyAdmin";
import './App.css';
import {Route, Routes} from "react-router-dom";
import MyUser from "./containers/User/MyUser/MyUser";

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<MyUser/>}/>
        <Route path='admin/*' element={<MyAdmin/>}/>
      </Routes>
    </>
  );
}

export default App;
