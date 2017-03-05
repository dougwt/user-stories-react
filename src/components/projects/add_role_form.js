import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ThreeBounce } from 'better-react-spinkit';

import { createRole } from '../../actions';

import './add_role_form.css';

function InlineInputField(field) {
  return <input {...field.input} placeholder={field.placeholder} type={field.type} className="form-control" />;
}

export class AddRoleForm extends Component {
  static propTypes = {
    createRole: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
    project: React.PropTypes.object,
    role_isPosting: React.PropTypes.bool,
    role_error: React.PropTypes.object
  }

  handleFormSubmit(props) {
    const projectId = this.props.project._id;
    // Insert the projectId into the form props, so that
    // createRole knows to which project it should be added.
    props.projectId = projectId;
    // Pass the form props to the createRole action creator.
    this.props.createRole(props);
  }

  renderSubmit() {
    if (this.props.role_isPosting) {
      return (
        <div className="input-group-addon loading">
          <ThreeBounce size={8} color='#999'/>
        </div>
      );
    }
    return (
      <div className="input-group-btn">
        <button type="submit" className={'btn ' + (this.props.role_error ? 'btn-danger' : 'btn-default')}>Add</button>
      </div>
    );
  }

  renderError() {
    if (this.props.role_error) {
      return (
        <span className="error text-danger">{this.props.role_error}</span>
      );
    }
  }

  render() {
    const { handleSubmit, role_error } = this.props;

    return (
      <form className="add-role-form form-inline" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className={'input-group form-group ' + (role_error ? 'has-error' : '')}>

          <Field
            name="name"
            placeholder="Add a new Role..."
            className="form-control"
            component={InlineInputField}/>

          {this.renderSubmit()}

        </div>
        {this.renderError()}
      </form>
    );
  }

}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a name';
  }

  return errors;
}


function mapStateToProps(state) {
  return {
    project: state.projects.project,
    role_isPosting: state.projects.role_isPosting,
    role_error: state.projects.role_error
  };
}

AddRoleForm = reduxForm({form: 'add-role', validate})(AddRoleForm);
AddRoleForm = connect(mapStateToProps, { createRole })(AddRoleForm);
export default AddRoleForm;
