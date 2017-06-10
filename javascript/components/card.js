import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {

  render() {
      return (
        <Link to={`/recipe/${this.props.slug}`} className="card">
          <h3 className="card__title">{this.props.title ? this.props.title : 'Card title'}</h3>
          <img src="http://i0.wp.com/56kilo.se/wp-content/uploads/2017/05/012A3681.jpg?w=1200" className="card__img" />
          <div className="tags">
            <span className="tags__tag">Tag</span>
          </div>
        </Link>
      )
  }
}
