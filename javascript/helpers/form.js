import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ToolTip from 'react-portal-tooltip';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
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
      values.img = downloadURL;


      post(values);
    });

  } else {
    //else send value as is
    post(values);
  }
}


class AddToolTip extends Component {
  state = {
      isTooltipActive: false
  }

  showTooltip() {
      this.setState({isTooltipActive: true})
  }
  hideTooltip() {
      this.setState({isTooltipActive: false})
  }

  render() {
    let style = {
      style: {
        background: '#fff',
        padding: 10,
        border: '1px solid #000'
      },
      arrowStyle: {
        color: '#fff',
        borderColor: '#000'
      }
    }
    return (
      <span>
          <span className="copy-help" id={this.props.parent} onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>help</span>
          <ToolTip active={this.state.isTooltipActive} position="right" arrow="left" parent={`#${this.props.parent}`} style={style}>
            <div>
                <span>{ this.props.helptext }</span>
            </div>
          </ToolTip>
      </span>
    )
  }
}
export function renderField(field) {
  const { meta: { touched, error } } = field;

  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{field.label}{field.required ? '*' : ''} { field.helptext ?
      <AddToolTip parent={field.input.name} helptext={field.helptext} /> : ''}</label>

      <input
        type={field.type ? field.type : "text"}
        className="form-control"
        {...field.input}
      />
      <p className="text-error">
        {touched ? error : ''}
      </p>
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
      <label>{field.label}{field.required ? '*' : ''}</label>
      <textarea
        className="form-control"
        {...field.input}
      ></textarea>
      <p className="text-error">
        {touched ? error : ''}
      </p>
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
  const img = field.input.value;
  const {
    input: {
      value: omitValue,
      onChange,
      onBlur,
      ...inputProps,
    },
    meta: {
      submitFailed,
      error
    },
    ...props,
  } = field;

  return (
    <div>
      <img data-behaviour="display-img" src={img} />

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
        className="img-label recipe-img__label">{ img ? 'Change image' : 'Upload an image'}</label>

      <p className="text-error">
        {(submitFailed && error)? error : ''}
      </p>
    </div>
  );
}


class SetTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data.value !== nextProps.data.value) {
      this.setState({ tags: nextProps.data.value });
    }
  }

  adaptTagEventToValue(delegate) {
      return e => {
        this.setState({ tags: e });
        return delegate(e);
      };
  }

  render() {
    const inputProps = {
       name: this.props.data.name
    }

    return (
      <TagsInput
        {...this.props.data}
        onChange={this.adaptTagEventToValue(this.props.data.onChange)}
        value={ this.state.tags }
        inputProps={ inputProps }
      />
    )
  }
}

export function renderTagsField(field) {
  const { meta: { touched, error } } = field;

  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}{field.required ? '*' : ''} { field.helptext ?
      <AddToolTip parent={field.input.name} helptext={field.helptext} /> : ''}</label>

      <SetTags data={field.input} />

      <p className="text-error">
        {touched ? error : ''}
      </p>
    </div>
  );
}
