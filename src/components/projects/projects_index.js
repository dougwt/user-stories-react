import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchProjects } from '../../actions'

class ProjectsIndex extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    return this.props.projects.map((project) => {
      return (
        <li className="list-group-item" key={project._id}>
          <span className="pull-right">{project.roles.map((role) => role.name).join(', ')}</span>
          <strong>
            <Link to={"projects/" + project._id}>
              {project.name}
            </Link>
          </strong>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Projects</h3>

        <ul className="list-group">
          {this.renderProjects()}
        </ul>

        <div className="text-right">
          <Link to="/new" className="btn btn-primary">
            <span className="glyphicon glyphicon-plus"></span> Add
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects.all }
}

export default connect(mapStateToProps, { fetchProjects })(ProjectsIndex)
