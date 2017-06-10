import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../actions';

class RecipeNew extends Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderFormat = this.renderFormat.bind(this);
  }

  renderFormat(field) {
    switch (field.field) {
      case 'input':
        return (
            <input
              type={field.type}
              className="form-control"
              {...field.input}
            />
        );

        break;
      default:

    }
  }

  renderItem(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				{this.renderFormat(field)}
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

  renderField(data) {
    return (
      <Field
        label={data.label}
        name={data.name}
        field={data.field}
        component={this.renderItem}
        type={data.type}
        key={data.name}
      />
    );
  }

	onSubmit(values) {
    values.date = Date.now();
		this.props.createRecipe(values, () => {
		    this.props.history.push('/');
		});
	}

  render() {
    const formData = [
      {
        label: 'Title',
        name: 'title',
        field: 'input',
        type: 'text',
        required: true,
        error: 'Please enter a title',
        description: 'This is the title of the recipe'
      },
      {
        label: 'Source',
        name: 'source',
        field: 'input',
        type: 'url',
        required: false,
        description: 'Was this recipe created by someone else? If so, please give credit by adding a url'
      },
      {
        label: 'Image',
        name: 'image',
        field: 'input',
        type: 'file',
        required: true,
        error: 'Please add an image',
        description: 'Add an image'
      }
    ]

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        {formData.map(this.renderField)}

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
    );
  }
}

//validate the form & add it to the reduxForm helper as an option called validate
function validate(values) {
  console.log('validae');
	const errors = {};

	//Validate the pinpit from the 'values' object
	if(!values.title) {
		errors.title = "Enter a title!";
	}

	if(!values.categories) {
		errors.categories = "Enter a category!";
	}

	// if(!values.content) {
	// 	errors.content = "Enter a content!";
	// }


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
