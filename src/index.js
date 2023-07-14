import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContext} from '../src/auth/AuthContextComponent'
// import { Web3ContextProvider } from './context/web3Context';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();