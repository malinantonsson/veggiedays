import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      "firstName": this.props.currentUser.firstName,
      "lastName": this.props.currentUser.lastName,
      "sex": this.props.currentUser.sex,
      "email": this.props.userEmail,
      "phoneNumber": this.props.currentUser.phoneNumber
    };

    this.props.initialize(initData);
  }

  handleFormSubmit(formProps) {
    this.props.submitFormAction(formProps);
  }


  render() {
    const { handleSubmit } = this.props;


    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <label>First Name:</label>
          <Field name="firstName" type="text" component={renderField}/>

          <label>Last Name:</label>
          <Field name="lastName" type="text" component={renderField}/>

          <label>Gender:</label>
          <Field name="sex" component="select">
            <option></option>
            <option name="Male">Male</option>
            <option name="Female">Female</option>
          </Field>

          <label>Email:</label>
          <Field name="email" type="email" component={renderField} />

          <label>Phone:</label>
          <Field name="phoneNumber" type="tel" component={renderField}/>

          <button action="submit">Save changes</button>
        </form>
      </div>
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

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(form(ReduxFormTutorial));
