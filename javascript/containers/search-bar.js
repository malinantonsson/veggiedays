import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipes } from '../actions/index';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(evt) {
    this.setState({ term: evt.target.value });
  }

  onFormSubmit(evt) {
    evt.preventDefault();

		//we need to go and fetch the data
		this.props.fetchRecipes(this.state.term);
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
      </form>
    );
  }
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchRecipes }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
