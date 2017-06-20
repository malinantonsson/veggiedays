import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Storage } from '../firebase-config';

export function generateSlug(values) {
  return values.title.toLowerCase().replace(/ /g, '-');
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
  //render input field if there are no ingredients
  if(fields.length === 0) {
    fields.push({});
  }

  return (
    <div>
      <label>Ingredients</label>
      <ul className="ingredients__form">

        {fields.map((ingredient, index) =>
          <li className="ingredients__item" key={index}>
            <Field
              name={`${ingredient}.content`}
              type="text"
              component={ renderField }/>

              <button
                type="button"
                title="Remove ingredient"
                className="ingredients__remove"
                onClick={() => fields.remove(index)}>-</button>
          </li>
        )}
        <li>

          {touched && error && <span>{error}</span>}
        </li>
      </ul>

      <button
        type="button"
        onClick={() => fields.push({})}
        className="ingredients__add">
        Add ingredient
      </button>
    </div>
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

function handleImgChange(evt, _this) {
    if(!evt.target.files || !evt.target.files[0]) return;

    const img = evt.target.files[0];
    let imgElement = document.querySelector('[data-behaviour=display-img]');

    _this.setState({ img });

    const reader = new FileReader();

    reader.onload = function (e) {
        imgElement.setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(img);

}

export function renderImgField(field) {
  const { input:{value: omitValue, ...inputProps}, label, type, meta: { touched, error, warning }, that } = field

  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  let imgUrl;

  if(field.imgUrl) {
    imgUrl = field.imgUrl;
  }

  return (


    <div className={className}>

      <img data-behaviour="display-img" src={imgUrl} />

      <input
        id="recipe-img"
        name="img"
        type={type ? type : "text"}
        className="form-control"
        onChange={(evt) => handleImgChange(evt, that)}
      />

      <label
        htmlFor="recipe-img"
        className="img-label recipe-img__label">Upload an image</label>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}
