import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { fetchRecipes } from '../actions/index';

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
    _.filter(this.props.recipes, function(recipe) {
        if(!recipe.tags) return false;
        
        recipe.tags.map(function(tag) {
          console.log(tag);
        })
      return !recipe.active;
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

		//we need to go and fetch the data
		//this.props.fetchRecipes(this.state.term);
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
          { this.state.matched.map(function(item) {
            {item}
          })
        }
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
