import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './components/Context';
import Navbar from './components/navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalState>
      <Navbar />
      <App />
    </GlobalState>
  </BrowserRouter>
);

