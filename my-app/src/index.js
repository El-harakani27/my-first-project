import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState,useEffect } from 'react';
import { Product,FooterBanner,HeroBanner } from './components'
import App from './App'
import {Layout} from './components'
import { StateContext } from './context/StateContext';
const Hom = () => {

  return (
    <>
    <StateContext>
      <Layout>
        <App />
      </Layout>
    </StateContext>
    </>
    
  )
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Hom />
    </React.StrictMode>
  );



