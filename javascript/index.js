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
import RecipeShow from './containers/recipe_show';
const APP_CONTAINER = document.querySelector('.app-container');


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Header />
        <main className="wrapper">
          <Switch>
              <Route path="/recipe/new" component={RecipeNew} />
              <Route path="/recipe/edit/:slug" component={RecipeShow} />
              <Route path="/recipe/:slug" component={RecipeShow} />
    	    		<Route path="/" component={App} />
  	    	</Switch>
        </main>
      </div>
    </Router>
  </Provider>
  , APP_CONTAINER
);
