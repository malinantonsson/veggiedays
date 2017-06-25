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

  renderImg() {
    const recipe = this.props.recipe;

    if(recipe.img) {
      return (
        <div className="recipe-img__wrapper">
          <img className="recipe__img" src={recipe.img} />
        </div>
      );
    }
  }

  renderSource() {
    const recipe = this.props.recipe;

    if(recipe.source) {
      return (
        <div className="recipe__src">
          <a href={recipe.source} className="recipe__src-link" target="_blank">
            Source
          </a>
        </div>
      );
    }
  }

  renderIngredient(ingredients) {
    return ingredients.map(function(ingredient, index){
        return <li key={index}>{ingredient.content}</li>
      }
    );
  }

  renderIngredients() {
    const recipe = this.props.recipe;
    if(recipe.ingredients) {
      return (
        <div>
          <h2 className="ingredients__heading">Ingredients</h2>
          <ul className="ingredients__list">
            { this.renderIngredient(recipe.ingredients)}
          </ul>
        </div>
      );
    }
  }

  renderInstructions() {
    const recipe = this.props.recipe;
    if(recipe.instructions) {
      return (
        <div>
          <h2 className="ingredients__heading">Instructions</h2>
          <p className="recipe__instructions">
            { recipe.instructions }
          </p>
        </div>
      );
    }
  }

  renderTag(tags) {
    return tags.map(function(tag, index){
        return <li key={index} className="tags__tag">{tag}</li>
      }
    );
  }

  renderTags() {
    const recipe = this.props.recipe;

    return (
      <div>
        <h3 className="tags__heading">Tags</h3>
        <ul className="tags__list">
          { this.renderTag(recipe.tags) }
        </ul>
      </div>
    );
  }
  render() {
		const { recipe } = this.props;
    if(!recipe) return <div>Loading...</div>

    return (

      <div className="recipe">
        <h1 className="recipe__title">{recipe.title}</h1>

        {this.renderImg()}

        <p className="recipe__description">
          {recipe.content}
        </p>

        { this.renderIngredients() }

        { this.renderInstructions() }

        { this.renderSource() }

        { recipe.tags ? this.renderTags() : '' }
      </div>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
	//pull off the recipe we need
	return { recipe: recipes[ownProps.match.params.slug]};
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeShow);
