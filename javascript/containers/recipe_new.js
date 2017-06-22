import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../actions';

import { onFormSubmit, renderField, renderIngredients, renderTextField, fileInput } from '../helpers/form';

class RecipeNew extends Component {
  constructor(props) {
    super(props);

    this.postForm = this.postForm.bind(this);
    this.state = { img : null};

  }

  postForm(values) {
    this.props.createRecipe(values, () => {
        this.props.history.push('/');
    });
  }

  onSubmit(values) {
    onFormSubmit(values, true, this.postForm);
	}

  render() {

    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="recipe-new">

        <Field
          label="Title"
          name="title"
          component={ renderField }
          type="text"
          required="true"
          helptext="Choose a title that is short but descriptive"
        />

        <Field
          label="Source"
          name="source"
          component={ renderField }
          type="url"
          helptext="Did someone else create this recipe? If so, give credit!"
        />

        <Field
          label="Description"
          name="content"
          component={ renderTextField }
          required="true"
        />

        <FieldArray
          name="ingredients"
          component={ renderIngredients }/>

        <Field
          label="Instructions"
          name="instructions"
          component={ renderTextField }
        />

        <Field
          name="img"
          component={ fileInput }
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
		errors.title = "Please enter a title!";
	}

	if(!values.content) {
		errors.content = "Please enter a description.";
	}

  if(!values.img) {
		errors.img = "Please enter an image";
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
