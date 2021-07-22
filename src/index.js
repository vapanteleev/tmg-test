import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = ( <React.StrictMode>
    <App />
  </React.StrictMode>)
ReactDOM.render(
  app
 ,
  document.getElementById('root')
);



reportWebVitals();

