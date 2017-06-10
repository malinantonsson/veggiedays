import '../styles/app';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import App from './components/app';
import Header from './components/header';
import RecipeNew from './containers/recipe_new';
const APP_CONTAINER = document.querySelector('.app-container');


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div className="wrapper">
        <Header />
        <Switch>
	    		<Route path="/recipe/new" component={RecipeNew} />
	    		<Route path="/" component={App} />
	    	</Switch>
      </div>
    </Router>
  </Provider>
  , APP_CONTAINER
);
