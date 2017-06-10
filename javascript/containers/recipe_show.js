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

  render() {
    console.log(this.props.recipe);

		const { recipe } = this.props;
    if(!recipe) return <div>Loading...</div>

    return (

      <div>Show a recipe: {recipe.title}</div>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
  //console.log(ownProps);
  //console.log(recipes);
  //if(recipes.length == 0)
  //const recipe = _.map(recipes[0], recipe => recipe);
  //console.log(recipes);

	//pull off the recipe we need
	return { recipe: recipes[ownProps.match.params.slug]};
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeShow);
