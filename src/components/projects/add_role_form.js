import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createRole, fetchProject } from '../../actions';

function InlineInputField(field) {
  return <input {...field.input} placeholder={field.placeholder} type={field.type} className="form-control" />;
}

export class AddRoleForm extends Component {
  static propTypes = {
    project: React.PropTypes.object,
    createRole: React.PropTypes.func,
    fetchProject: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
  }

  handleFormSubmit(props) {
    const projectId = this.props.project._id;
    // Insert the projectId into the form props, so that
    // createRole knows to which project it should be added.
    props.projectId = projectId;
    // Pass the form props to the createRole action creator.
    this.props.createRole(props)
      .then(() => {
        // role has been created
        console.log('Role added!');
        this.props.fetchProject(projectId);
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="input-group">

          <Field
            name="name"
            placeholder="Add a new Role..."
            className="form-control"
            component={InlineInputField}/>

          <div className="input-group-btn">
            <button type="submit" className="btn btn-default">Add</button>
          </div>
        </div>
      </form>
    );

  }

}

function mapStateToProps(state) {
  return {
    project: state.projects.project
  };
}

AddRoleForm = reduxForm({form: 'add-role'})(AddRoleForm);
AddRoleForm = connect(mapStateToProps, { createRole, fetchProject })(AddRoleForm);
export default AddRoleForm;
