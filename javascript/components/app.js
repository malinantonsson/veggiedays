import React, { Component } from 'react';
import Card from './card';
import SearchBar from '../containers/search-bar';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1>What are you looking for</h1>
        <SearchBar />

        <div className="cards featured-cards">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}
