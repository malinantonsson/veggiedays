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
    //first turn the objects into an array so we can iterate over it
    //then sort by date so the latest post comes first
    //then return the markup
    const orderedRecipes = _.orderBy(_.map(this.props.recipes[0], (recipe) => recipe), ['date'], ['desc']);
    return orderedRecipes.map((recipe, key) => {
      return (
        <Card key={key} title={recipe.title} slug={recipe.slug}/>
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
