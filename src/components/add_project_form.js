import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createProject } from '../actions'

class AddProjectForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Create a New Project</h3>

        <form onSubmit={handleSubmit(this.props.createProject)}>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              component="input"
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <Field
              name="slug"
              component="input"
              type="text"
              className="form-control"
              placeholder="project-slug"
            />
          </div>

          <div className="form-group">
            <label htmlFor="roles">Roles</label>
            <Field
              name="roles"
              component="input"
              type="text"
              className="form-control"
              placeholder="user, admin, tester"
            />
          </div>

          <button type="submit" className="btn btn-default">Add Project</button>
        </form>
      </div>
    )
  }
}

AddProjectForm = reduxForm({form: 'add-project'})(AddProjectForm)
AddProjectForm = connect(null, { createProject })(AddProjectForm)
export default AddProjectForm
