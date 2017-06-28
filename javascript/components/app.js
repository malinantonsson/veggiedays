import React, { Component } from 'react';

import LatestRecipies from '../containers/recipes_latest';

import SearchBar from '../containers/search-bar';

export default class App extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>What are you looking for?</h1>
        <SearchBar />

        <h2>Latest recipes</h2>
      </div>
    );
  }
}
