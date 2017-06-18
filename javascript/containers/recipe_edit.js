import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { onFormSubmit } from '../helpers/form';

const form = reduxForm({
  form: 'ReduxFormTutorial',
  validate
});

const renderField = field => (
    <div>
      <input {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);


class ReduxFormTutorial extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);

    this.renderImgField = this.renderImgField.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);

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
    console.log(values);

    onFormSubmit(this.state, values, false, this.postForm);
	}

  renderField(field) {
    console.log('render field');
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					type={field.type ? field.type : "text"}
					className="form-control"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

  handleImgChange(evt) {
      this.setState({ img: evt.target.files[0]});
  }

  renderImgField({ input:{value: omitValue, ...inputProps}, label, type, meta: { touched, error, warning } } = field) {
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{label}</label>
				<input
          name="img"
					type={type ? type : "text"}
					className="form-control"
          onChange={(evt) => this.handleImgChange(evt)}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
  }

  renderTextField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <textarea
          className="form-control"
          {...field.input}
        ></textarea>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderIngredients({ fields, meta: { touched, error } }) {
    return (
      <ul>

        {fields.map((ingredient, index) =>
          <li key={index}>
            <button
              type="button"
              title="Remove ingredient"
              onClick={() => fields.remove(index)}>Remove</button>
            <h4>ingredient #{index + 1}</h4>
            <Field
              name={`${ingredient}.content`}
              type="text"
              component={this.renderField}
              label="ingredient"/>
          </li>
        )}
        <li>
          <button type="button" onClick={() => fields.push({})}>Add ingredient</button>
          {touched && error && <span>{error}</span>}
        </li>
      </ul>
    );
  }


  render() {
    const { handleSubmit } = this.props;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field
          label="Title"
          name="title"
          component={this.renderField}
          type="text"
        />

        <Field
          label="Source"
          name="source"
          component={this.renderField}
          type="url"
        />

        <Field
          label="Description"
          name="content"
          component={this.renderTextField}
        />

        <FieldArray
          name="ingredients"
          component={this.renderIngredients}/>

        <Field
          label="Image"
          name="image"
          type="file"
          component={this.renderImgField}
        />

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.phoneNumber) {
    errors.phoneNumber = 'Please enter a phone number'
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
