import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../actions';
import _ from 'lodash';

export class RecipeShow extends Component {
  componentDidMount() {
		//get the id from the url
		//if comes from the router definition
		const { slug } = this.props.match.params;
		this.props.fetchRecipe(slug);
	}

  renderImg(recipe) {
    if(recipe.imgUrl) {
      return (
        <div className="recipe-img__wrapper">
          <img className="recipe__img" src={recipe.imgUrl} />
        </div>
      );
    }
    console.log(recipe);
  }

  render() {
		const { recipe } = this.props;
    if(!recipe) return <div>Loading...</div>

    return (

      <div className="recipe">
        <h1 className="recipe__title">{recipe.title}</h1>
        {this.renderImg(recipe)}
      </div>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
	//pull off the recipe we need
	return { recipe: recipes[ownProps.match.params.slug]};
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeShow);
