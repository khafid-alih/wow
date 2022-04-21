import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import IndexState from "./reducer/state/indexState"

ReactDOM.render(
  <React.StrictMode>
    <IndexState>
      <App /> 
    </IndexState>
  </React.StrictMode>,
  document.getElementById('root')
);
