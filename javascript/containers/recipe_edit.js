import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { onFormSubmit, renderField, renderIngredients, renderTextField, handleImgChange, renderImgField } from '../helpers/form';

const form = reduxForm({
  form: 'ReduxFormTutorial',
  validate
});


class ReduxFormTutorial extends Component {
  constructor(props) {
    super(props);

    this.postForm = this.postForm.bind(this);

    this.state = { img : ''};
  }
  componentDidMount() {
    //get the id from the url
		//if comes from the router definition
    const { slug } = this.props.match.params;
		this.props.fetchRecipe(slug);
  }

  postForm(values) {
    this.props.editRecipe(values.firebaseKey, values, () => {
        this.props.history.push(`/recipe/${values.slug}`);
    });
  }

  onSubmit(values) {
    onFormSubmit(this.state, values, false, this.postForm);
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
          that={this}
          component={ renderImgField }
        />

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = "Enter a title!";
  }

  if (!formProps.content) {
		errors.content = "Enter a content!";
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  //console.log(state);
  return {
    user: state.user,
    recipe: state.recipes[ownProps.match.params.slug],
    initialValues: state.recipes[ownProps.match.params.slug]
  };
}

export default connect(mapStateToProps, actions)(form(ReduxFormTutorial));

//
// export default connect((state, ownProps) => ({
//     initialValues: state.recipes[ownProps.match.params.slug] // pull initial values from account reducer
//   }), actions)(form(ReduxFormTutorial));
