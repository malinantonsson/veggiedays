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
		this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
		this.props.fetchRecipes();
	}

  filterList() {

    const filteredList = _.filter(this.props.recipes, recipe => {
        if(!recipe.tags) return false;

        let filteredTags = recipe.tags.filter( tag =>  {
          return tag.toLowerCase().indexOf(this.state.term.toLowerCase()) > -1;
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
    this.setState({
      term: evt.target.value
    });

    this.filterList();
  }

  onFormSubmit(evt) {
    evt.preventDefault();

		this.setState({ term: '' });
  }

  render() {
    return (
      <form className="search" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          className="search__field"
          placeholder="Broccie"
					value={ this.state.term }
					onChange={ this.onInputChange }
        />

        <button type="submit" className="search__btn">Submit</button>

        <div className="result">
          <h3>Result</h3>
          <div className="cards latest-cards">
            {this.renderRecipes()}
          </div>
        </div>
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
