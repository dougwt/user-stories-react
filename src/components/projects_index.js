import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchProjects } from '../actions'

class ProjectsIndex extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    return this.props.projects.map((project) => <li key={project.name}>{project.name}</li>)
  }

  render() {
    return (
      <div>
        <h3>Projects</h3>

        <ul>
          {this.renderProjects()}
        </ul>

        <Link to="/new">
          Add a Project
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects.all }
}

export default connect(mapStateToProps, { fetchProjects })(ProjectsIndex)
