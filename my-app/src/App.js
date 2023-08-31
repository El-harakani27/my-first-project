import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import {Home,ProductDetails} from './components';

const App= ()=> {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route path='/product/:prodid' element={<ProductDetails/>}></Route>
    </Routes>
       
        

    
</Router>
  );
}
export default App;
