import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createProject } from '../../actions'
import InputField from '../input_field'

import './add_project_form.css';

class AddProjectForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit(props) {
    this.props.createProject(props)
      .then(() => {
        // project has been created, navigate the user to account home.
        this.context.router.push('/')
      })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Add a new project</h3>

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <Field
              name="name"
              label="Project name"
              placeholder="Project Name"
              component={InputField}/>

            <Field
              name="slug"
              label="Project slug"
              placeholder="project-slug"
              component={InputField}/>

          <Link to="/" className="btn btn-danger">Cancel</Link>
          <button type="submit" className="btn btn-default">Create a new project</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a name'
  }
  if (!values.slug) {
    errors.slug = 'Enter a slug'
  }

  return errors;
}

AddProjectForm = reduxForm({form: 'add-project', validate})(AddProjectForm)
AddProjectForm = connect(null, { createProject })(AddProjectForm)
export default AddProjectForm
