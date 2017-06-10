import React, { Component } from 'react';

export default class Card extends Component {

  render() {
      return (
        <div className="card">
          <h3 className="card__title">{this.props.title ? this.props.title : 'Card title'}</h3>
          <img src="http://i0.wp.com/56kilo.se/wp-content/uploads/2017/05/012A3681.jpg?w=1200" className="card__img" />
          <div className="tags">
            <span className="tags__tag">Tag</span>
          </div>
        </div>
      )
  }
}
