import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchProjects } from '../../actions';

import './project_list.css';

export class ProjectList extends Component {
  static propTypes = {
    fetchProjects: React.PropTypes.func,
    projects: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    error: React.PropTypes.string
  }

  componentWillMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    if(this.props.error) {
      return <li className="project list-group-item">Unable to fetch projects. {this.props.error.toString()}</li>;
    }
    if (this.props.isLoading) {
      return <li className="project list-group-item">Loading...</li>;
    }
    return this.props.projects.map((project) => {
      return (
        <Link to={'projects/' + project._id} className="project list-group-item list-group-item-action" key={project._id}>
          <span className="name">{project.name}</span> <span className="slug">{project.slug}</span>
          <span className="roles pull-right">{project.roles.map((role) => role.name).join(', ')}</span>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="projects-list">
        <h3>Projects</h3>

        <div className="list-group">
          {this.renderProjects()}
        </div>

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
  return {
    projects: state.projects.all,
    isLoading: state.projects.all_isLoading,
    error: state.projects.all_error
  };
}

export default connect(mapStateToProps, { fetchProjects })(ProjectList);
