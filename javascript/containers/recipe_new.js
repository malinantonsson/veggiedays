import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../actions';
import { Storage } from '../firebase-config';

class RecipeNew extends Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);

    this.renderImgField = this.renderImgField.bind(this);

    this.state = { img : ''};

  }

  generateSlug(values) {
    return values.title.replace(' ', '-');
  }

	onSubmit(values) {
    const props = this.props;
    values.date = Date.now();
    values.slug = this.generateSlug(values);


    var file = this.state.img;
    //if there is a file
    if(file.name) {
      var storageRef = Storage.ref();

      // Create the file metadata
      var metadata = {
        contentType: file.type
      };

      // Upload file and metadata
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        values.imgUrl = downloadURL;

    		props.createRecipe(values, () => {
    		    props.history.push('/');
    		});
      });

    } else {
      //else send value as is
      this.props.createRecipe(values, () => {
  		    this.props.history.push('/');
  		});
    }
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
