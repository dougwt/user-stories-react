import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProject, deleteRole } from '../../actions';
import AddRoleForm from './add_role_form.js';

// import '../../loading.css';

export class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: React.PropTypes.func,
    deleteRole: React.PropTypes.func,
    project: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
    error: React.PropTypes.string,
    params: React.PropTypes.object
  }

  componentWillMount() {
    this.props.fetchProject(this.props.params.id);
  }

  handleClick(roleId, e) {
    e.preventDefault();
    this.deleteRole(roleId);
  }

  deleteRole(roleId) {
    const projectId = this.props.params.id;

    // Dispatch a request to the API server to delete the Role
    this.props.deleteRole({ projectId, roleId })
    .then(() => {
      // Remove the Role from local state
      // this.props.fetchProject(projectId);
    });
  }

  renderRoles(roles) {
    if (roles < 1) {
      return (
        <li className="role list-group-item">
          <em>This project currently has no roles. Please create one.</em>
        </li>
      );
    }
    return roles.map((role) => {
      return (
        <li className="role list-group-item" key={role.name}>
          {role.name}
          <button className="pull-right" onClick={this.handleClick.bind(this, role._id)}>delete</button>
        </li>
      );
    });
  }

  render() {
    const { project } = this.props;
    if(this.props.error) {
      return (
        <div className="projects-detail">
          Unable to fetch project. {this.props.error.toString()}
        </div>
      );
    }
    if(this.props.isLoading || !project) {
      return (
        <div className="projects-detail">
          Loading {this.props.params.id}...
        </div>
      );
    }

    return (
      <div className="projects-detail">
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Slug:</strong> {project.slug}</p>
        <p><strong>Owner:</strong> {project.owner}</p>

        <p><strong>Roles:</strong></p>
        <ul className="list-group">

          {this.renderRoles(project.roles)}

          <li className="list-group-item">
            <AddRoleForm projectId={project.id}/>
          </li>
        </ul>

        <p><strong>Stories:</strong></p>
        <ul><li className="story">???</li></ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.projects.project,
    isLoading: state.projects.project_isLoading,
    error: state.projects.project_error
  };
}

export default connect(mapStateToProps, { fetchProject, deleteRole })(ProjectDetails);
