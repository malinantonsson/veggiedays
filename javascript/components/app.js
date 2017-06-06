import React, { Component } from 'react';
import Card from './card';

export default class App extends Component {
  render() {
    return (
      <div className="cards featured-cards">
        <Card />
        <Card />
        <Card />

      </div>
    );
  }
}
