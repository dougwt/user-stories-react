import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authSignup } from '../../actions'
import InputField from '../input_field'

class SignupForm extends Component {

  handleFormSubmit(formProps) {
    this.props.authSignup(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <Alert bsStyle="danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </Alert>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup-form">
        <h3>Sign up</h3>

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <Field
            name="email"
            label="Email address"
            type="text"
            // placeholder="email address"
            component={InputField}/>

          <Field
            name="password"
            label="Password"
            type="password"
            // placeholder="password"
            component={InputField}/>

          <Field
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            // placeholder="password"
            component={InputField}/>

          <Field
            name="name"
            label="Name"
            type="text"
            // placeholder="password"
            component={InputField}/>

          {this.renderAlert()}

          <button type="submit" className="btn btn-default">Sign up</button>
        </form>
      </div>
    )
  }

}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter an email';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }
  else if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Enter a password confirmation';
  }
  if (!values.name) {
    errors.name = 'Enter a name';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SignupForm = reduxForm({form: 'auth-signup', validate})(SignupForm)
SignupForm = connect(mapStateToProps, { authSignup })(SignupForm)
export default SignupForm
