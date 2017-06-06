import '../styles/app';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
const APP_CONTAINER = document.querySelector('.app-container');



ReactDOM.render(
  <App />
  , APP_CONTAINER
);
