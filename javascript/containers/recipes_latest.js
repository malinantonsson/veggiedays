import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchLastThreeRecipes } from '../actions';
import Card from '../components/card';

export class fetchLatestRecipes extends Component {
  //called as soon as the component shows up in the DOM
	componentDidMount() {
		this.props.fetchLastThreeRecipes();
	}

  renderRecipes() {
    //sort by date so the latest post comes first
		const orderedRecipes = _.orderBy(this.props.recipes, ['date'], ['desc']);
    return orderedRecipes.map((recipe) => {
      return (
        <Card key={recipe.date} recipe={recipe} title={recipe.title} slug={recipe.slug}/>
      );
    });
  }

  render() {
    if(this.props.recipes.length === 0) {
      return <div>Loading...</div>
    }

    return (
      <div className="cards latest-cards">
        {this.renderRecipes()}
      </div>
    );
  }
}


function mapStateToProps(state) {
	return { recipes: state.recipes };
}


export default connect(mapStateToProps, { fetchLastThreeRecipes })(fetchLatestRecipes);
