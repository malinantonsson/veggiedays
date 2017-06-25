import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {

  render() {
    const { slug, title, img, tags } = this.props.recipe;
      return (
        <Link to={`/recipe/${slug}`} className="card">
          <h3 className="card__title">{title ? title : 'Card title'}</h3>
          <img src={img ? img : "http://i0.wp.com/56kilo.se/wp-content/uploads/2017/05/012A3681.jpg?w=1200"} className="card__img" />
          <div className="tags__list">
            { tags ? tags.map(function(tag, i){
              return <span className="tags__tag">{ tag }</span>
            }): '' }
          </div>
        </Link>
      )
  }
}
