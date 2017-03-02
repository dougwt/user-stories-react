import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProject } from '../../actions';

export class ProjectsShow extends Component {
  static propTypes = {
    fetchProject: React.PropTypes.func,
    project: React.PropTypes.object,
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

    if(!project) {
      return <div>Loading '{this.props.params.id}' ...</div>;
    }

    return (
      <div className="projects-detail">
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Slug:</strong> {project.slug}</p>
        <p><strong>Owner:</strong> {project.owner}</p>

        <p><strong>Roles:</strong></p>
        <ul>{this.renderRoles(project.roles)}</ul>

        <p><strong>Stories:</strong></p>
        <ul><li className="story">???</li></ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { project: state.projects.project };
}


export default connect(mapStateToProps, { fetchProject })(ProjectsShow);
