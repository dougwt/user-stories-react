import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authSignin } from '../../actions'
import InputField from '../input_field'

class SigninForm extends Component {

  handleFormSubmit({ email, password }) {
    this.props.authSignin({ email, password })
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
      <div className="signin-form">
        <h3>Sign in</h3>

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

          {this.renderAlert()}

          <button type="submit" className="btn btn-default">Sign in</button>
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

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SigninForm = reduxForm({form: 'auth-signin', validate})(SigninForm)
SigninForm = connect(mapStateToProps, { authSignin })(SigninForm)
export default SigninForm
