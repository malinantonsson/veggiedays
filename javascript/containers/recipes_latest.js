import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRecipes } from '../actions';
import Card from '../components/card';

export class fetchLatestRecipes extends Component {
  //called as soon as the component shows up in the DOM
	componentDidMount() {
		this.props.fetchRecipes();
	}

  renderRecipes() {
    return _.map(this.props.recipes[0], (recipe, key) => {
      console.log(recipe, key);
      return (
        <Card key={key} title={recipe.title}/>
      );
    });
  }

  render() {
    console.log(this.props.recipes);
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


export default connect(mapStateToProps, { fetchRecipes })(fetchLatestRecipes);
