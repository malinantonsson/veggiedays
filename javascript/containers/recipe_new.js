import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../actions';

class RecipeNew extends Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);

    //this.handleFile = this.handleFile.bind(this);

    this.renderImgField = this.renderImgField.bind(this);

    this.state = { img : ''};

  }

  generateSlug(values) {
    return values.title.replace(' ', '-');
  }

	onSubmit(values) {

    console.log(values);
    console.log(this.state);
    values.date = Date.now();
    values.slug = this.generateSlug(values);
		// this.props.createRecipe(values, () => {
		//     this.props.history.push('/');
		// });
	}

  renderField(field) {
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
      console.log(evt.target.files);
      //let formData = new FormData();
      //formData.append('name', 'malin');
      //console.log(formData);
      //return evt.target.files[0];
  }

  // const FileInput = (
  //   {
  //     input:{value: omitValue, …inputProps},
  //     label, type,
  //     meta: { touched, error, warning } }) => (

  renderImgField({ input:{value: omitValue, ...inputProps}, label, type, meta: { touched, error, warning } } = field) {
  //  console.log(field);
		//const { meta: { touched, error } } = field;
    //const  { input:{value: omitValue, ...inputProps} } = field;
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
          label="Post Content"
          name="content"
          component={this.renderField}
        />

        <Field
          label="Image"
          name="image"
          type="file"
          value="hey"
          component={this.renderImgField}
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
