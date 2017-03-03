import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProject } from '../../actions';
import AddRoleForm from './add_role_form.js';

export class ProjectsShow extends Component {
  static propTypes = {
    fetchProject: React.PropTypes.func,
    project: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
    error: React.PropTypes.string,
    params: React.PropTypes.object
  }

  componentWillMount() {
    this.props.fetchProject(this.props.params.id);
  }

  renderRoles(roles) {
    if (roles < 1) {
      return <li className="role">This project currently has no roles. Please create one.</li>;
    }
    return roles.map((role) => <li className="role" key={role.name}>{role.name}</li>);
  }

  render() {
    const { project } = this.props;
    if(this.props.error) {
      return <div className="projects-detail">Unable to fetch project. {this.props.error.toString()}</div>;
    }
    if(this.props.isLoading || !project) {
      return <div className="projects-detail">Loading {this.props.params.id}...</div>;
    }

    return (
      <div className="projects-detail">
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Slug:</strong> {project.slug}</p>
        <p><strong>Owner:</strong> {project.owner}</p>

        <p><strong>Roles:</strong></p>
        <ul>
          {this.renderRoles(project.roles)}
          <li>
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

export default connect(mapStateToProps, { fetchProject })(ProjectsShow);
