import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { fetchRecipes } from '../actions/index';
import Card from '../components/card';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        term: '',
        matched: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
		this.props.fetchRecipes();
	}

  filterList(term) {
    if(!term.length) {
      this.setState({ matched : [] });
      return;
    }

    const filteredList = _.filter(this.props.recipes, recipe => {
        if(!recipe.tags) return false;

        let filteredTags = recipe.tags.filter( tag =>  {
          return tag.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });

        return filteredTags.length > 0;
    });

    this.setState({ matched : filteredList });
  }

  renderRecipes() {
    //sort by date so the latest post comes first
		const orderedRecipes = _.orderBy(this.state.matched, ['date'], ['desc']);
    return orderedRecipes.map((recipe) => {
      return (
        <Card key={recipe.date} recipe={recipe} title={recipe.title} slug={recipe.slug}/>
      );
    });
  }

  onInputChange(evt) {
    const term = evt.target.value;
    this.setState({ term });
    this.filterList(term);
  }

  render() {

    return (
      <form className="search">
        <input
          type="text"
          className="search__field"
          placeholder="Broccie"
					value={ this.state.term }
					onChange={ this.onInputChange }
        />

          { this.state.matched.length > 0 ?
            <div className="search__result">
              <p className="search__heading">You searched for <strong>{ this.state.term }</strong></p>
              <div className="cards latest-cards">
                {this.renderRecipes()}
              </div>
          </div>
          : '' }
      </form>
    );
  }
}

function mapStateToProps(state) {
	return { recipes: state.recipes };
}


export default connect(mapStateToProps, { fetchRecipes })(SearchBar);

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ fetchRecipes }, dispatch);
// }
//
// export default connect(null, mapDispatchToProps)(SearchBar);
