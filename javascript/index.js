// import '../styles/app';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const APP_CONTAINER = document.querySelector('.app-container');

class App extends Component {
  render() {
    return (
      <div>This is my app</div>
    );
  }
}

ReactDOM.render(
  <App />
  , APP_CONTAINER
);
