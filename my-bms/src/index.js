/**
 * Application entry point for the client side.
 * It uses ReactDOM to render the application to the DOM.
 * 
 * @module src/index.js
 * @author XA1NE
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
