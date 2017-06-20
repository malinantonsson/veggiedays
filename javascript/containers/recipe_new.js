import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../actions';

import { onFormSubmit, renderField, renderIngredients, renderTextField, handleImgChange, renderImgField } from '../helpers/form';

class RecipeNew extends Component {
  constructor(props) {
    super(props);

    this.postForm = this.postForm.bind(this);
    this.state = { img : ''};

  }

  postForm(values) {
    this.props.createRecipe(values, () => {
        this.props.history.push('/');
    });
  }

  onSubmit(values) {
    onFormSubmit(this.state, values, true, this.postForm);
	}

  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field
          label="Title"
          name="title"
          component={ renderField }
          type="text"
        />

        <Field
          label="Source"
          name="source"
          component={ renderField }
          type="url"
        />

        <Field
          label="Description"
          name="content"
          component={ renderTextField }
        />

        <FieldArray
          name="ingredients"
          component={ renderIngredients }/>

        <Field
          label="Image"
          name="image"
          type="file"
          that={ this }
          component={ renderImgField }
        />

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
    );
  }
}

//validate the form & add it to the reduxForm helper as an option called validate
function validate(values) {
	const errors = {};

	//Validate the pinpit from the 'values' object
	if(!values.title) {
		errors.title = "Enter a title!";
	}

	if(!values.content) {
		errors.content = "Enter a content!";
	}


	//if errors is empty the form is valid, go and submit.
	//otherwise it faild validation
	return errors;
}

export default reduxForm({
	validate,
	form: 'RecipeNewForm' // a unique identifier for this form
})(
	connect(null,{ createRecipe })(RecipeNew)
);
