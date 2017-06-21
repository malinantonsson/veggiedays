import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Storage } from '../firebase-config';

export function generateSlug(values) {
  return values.title.toLowerCase().replace(/ /g, '-');
}

export function onFormSubmit(values, isNew, post) {

  if(isNew) {
    values.slug = generateSlug(values);
  }
  //const props = this.props;
  values.date = Date.now();
  //values.slug = this.generateSlug(values);

  //var file = state.img;

  //if there is a file
  if(values.img) {
    var storageRef = Storage.ref();

    // Create the file metadata
    var metadata = {
      contentType: values.img.type
    };

    // Upload file and metadata
    var uploadTask = storageRef.child('images/' + values.img.name).put(values.img, metadata);

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

function handleImgChange(img) {
    if(!img) return;

    const imgElement = document.querySelector('[data-behaviour=display-img]');
    const imgLabel = document.querySelector('.recipe-img__label');

    const reader = new FileReader();

    reader.onload = function (e) {
        imgElement.setAttribute('src', e.target.result);
        imgLabel.innerHTML = 'Change image';
    }

    reader.readAsDataURL(img);

}

function adaptFileEventToValue(delegate) {
    let evt = e => {
      if(e.target.files) {
        handleImgChange(e.target.files[0]);
      }
      return delegate(e.target.files[0]);
    };
    return evt;
}

export function fileInput(field) {
  const {
    input: {
      value: omitValue,
      onChange,
      onBlur,
      ...inputProps,
    },
    meta: omitMeta,
    imgUrl,
    ...props,
  } = field;

  return (
    <div>
      <img data-behaviour="display-img" src={imgUrl} />

      <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        id="recipe-img"
        {...inputProps}
        {...props}
      />
      <label
        htmlFor="recipe-img"
        className="img-label recipe-img__label">{ imgUrl ? 'Change image' : 'Upload an image'}</label>
    </div>
  );
}
