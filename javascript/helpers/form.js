import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

export function generateSlug(values) {
  return values.title.replace(' ', '-');
}

export function onFormSubmit(state, values, isNew, post) {

  if(isNew) {
    values.slug = generateSlug(values);
  }
  //const props = this.props;
  values.date = Date.now();
  //values.slug = this.generateSlug(values);

  var file = state.img;
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
          //TODO:
          //show loading sign
          break;
      }
    }, function(error) {
      //TODO:
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      values.imgUrl = downloadURL;


      post(values);
    });

  } else {
    //else send value as is
    post(values);
  }
}

export function renderField(field) {
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

export function renderIngredients({ fields, meta: { touched, error } }) {
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
            component={ renderField }
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

export function renderTextField(field) {
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
